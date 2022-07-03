import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ChatComponent } from 'src/app/components/chat/chat.component';

@Injectable({
  providedIn: 'root'
})
export class WebSocketAPIService {

  webSocketEndPoint: string = 'http://localhost:8080/ws';
  topic: string = "/topic/public";
  stompClient: any;
  // appComponent: AppComponent;

  constructor() {
   }

    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        return _this.stompClient.connect({}, function (frame) {
            return _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                return _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);

        // Tell your username to the server
        // _this.stompClient.send("/app/chat.addUser",{},JSON.stringify({message: "username", sender: '1',receiver : '30'})
// )
    };

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

 /**
  * Send message to sever via web socket
  * @param {*} message
  */
    _send(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        console.log("Message Recieved from Server :: " + message);
        // ChatComponent.handeleMessage(JSON.parse(message.body));
    }










}
