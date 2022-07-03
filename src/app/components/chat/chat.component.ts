import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestService } from 'src/app/service/httpRequest/http-request.service';
import { WebSocketAPIService } from 'src/app/service/webSocket/web-socket-api.service';


import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit , AfterViewInit , OnDestroy {

  listUsers ;
  userId ;
  currentUserId;
  messages = [];
  message ;

  webSocketEndPoint: string = 'http://localhost:8080/our-websocket?id=';
  topic: string = '/user/topic/private-messages';
  stompClient: any;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  scrollDown : number = 2712;


  constructor(private router : Router,
              private httpReq : HttpRequestService,
              private toastr : ToastrService,
              private webSocket : WebSocketAPIService,
              private activatedRoute: ActivatedRoute,
              private location: Location) {

              }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId =  params['id'];
      });

    this.getUsers();
    this.getMessages(this.userId);
  }

  ngAfterViewInit(){
    this.scrollToBottom();
  }

  getUsers(){
    const paylod = {
      method : "get",
      apiName : "getUsersChat",
      body : {}
    }
    const _this = this;
    this.httpReq.makeHttpRequest(paylod).subscribe(data =>{
      this.listUsers = data.users ;
      this.currentUserId = data.myId;
      debugger
      _this._connect();
    })
  }

  getMessages(userId){
    if(userId){
      this.location.go('/chat');
      this.userId = userId;
      const paylod = {
        method : "get",
        apiName : "getMessages",
        body : {id : this.userId}
      }

      this.httpReq.makeHttpRequest(paylod).subscribe(data =>{
        this.messages = data;
      });
    }
  }

  sendMessage(){
    let msg ={
      sender : this.currentUserId,
      receiver : this.userId,
      message : this.message,
    }
    this._send(msg)
    this.message ='';
    this.scrollToBottom();
  }


  _connect() {
    const _this = this
    var socket = new SockJS(this.webSocketEndPoint+this.currentUserId);
    _this.stompClient = Stomp.over(socket);
    _this.stompClient.connect({}, function (frame : any) {
        console.log('Connected: ' + frame);
        _this.stompClient.subscribe(_this.topic, function (message :any) {
            _this.onMessageReceived(message)
        });

    });
  }

  _disconnect() {
    if (this.stompClient !== null) {
        this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
        this._connect();
    }, 5000);
  }


  _send(message) {
    console.log("sending private message");
    this.stompClient.send('/ws/private-message', {}, JSON.stringify(message));
    this.messages.push(message);
  }

  onMessageReceived(message) {
    if(JSON.parse(message.body).sender_id == this.userId){
    this.messages.push(JSON.parse(message.body));
    }
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  ngOnDestroy(){
    this._disconnect();
  }



}
