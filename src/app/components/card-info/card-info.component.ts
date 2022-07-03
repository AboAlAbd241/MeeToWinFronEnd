import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';
import { HttpRequestService } from 'src/app/service/httpRequest/http-request.service';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent implements OnInit {

  eventId : any;
  eventDetails  ;
  subscribedUsers : any = [];
  subscription : any [] = [];
  resourcesLoaded1 : boolean = false ;
  resourcesLoaded2 : boolean = false ;
  isSubscribed = false ;




  constructor(private router :Router,
              private activatedRoute : ActivatedRoute,
              private httpReq : HttpRequestService,
              private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getEventId();
    this.getEventInfo();
    this.getSubscribedUsers();

  }

  getEventId(){
    this.activatedRoute.params.subscribe(params => {
      this.eventId =  params['id'];
      });
  }

  getEventInfo(){

    var payload = {
      apiName: 'eventDetails',
      body: {id : this.eventId},
      method: 'GET'
    };

      this.subscription.push(this.httpReq.makeHttpRequest(payload).pipe(map(function(res){
        return res;
    })).subscribe(data => {
        const event =data[0];
        this.eventDetails = event;
        this.resourcesLoaded1 = true ;
      }))

  }

  getSubscribedUsers(){
    let apiName ;
    if(localStorage.getItem('token')){
      apiName = "subscribedUsersAuth"
    }else{
      apiName = "subscribedUsers"
    }

    var payload = {
      apiName: apiName,
      body: {id : this.eventId},
      method: 'GET'
    };

      this.subscription.push(this.httpReq.makeHttpRequest(payload).pipe(map(function(res){
        return res;
    })).subscribe(data => {
        this.subscribedUsers = data.users
        this.isSubscribed = data.isSubscribed
        this.resourcesLoaded2 = true ;
      }))
  }

  goToProfile(id : any){
    this.router.navigate(['profile', id]);
  }

  enrollUser(){

    var payload = {
      apiName: "enrollUser",
      body: {id : this.eventId},
      method: 'GET'
    };
    this.resourcesLoaded1 = false ;
    this.resourcesLoaded2 = false ;


      this.subscription.push(this.httpReq.makeHttpRequest(payload).pipe(map(function(res){
        return res;
    })).subscribe(data => {
        if(data.status == "success"){
          this.toastr.success("You have registred successfuly","Registered")
          this.getSubscribedUsers();
          this.resourcesLoaded1 = true ;
          this.resourcesLoaded2 = true ;
        }
        else{
          this.toastr.error("Abnormal Error Please try Again","Ops")
          this.resourcesLoaded1 = true ;
          this.resourcesLoaded2 = true ;
        }
      }))
  }

  unEnrollUser(){
    var payload = {
      apiName: "unEnrollUser",
      body: {id : this.eventId},
      method: 'GET'
    };
    this.resourcesLoaded1 = false ;
    this.resourcesLoaded2 = false ;


      this.subscription.push(this.httpReq.makeHttpRequest(payload).pipe(map(function(res){
        return res;
    })).subscribe(data => {
        if(data.status == "success"){
          this.toastr.success("You have unenrolled successfuly","Unenrolled")
          this.getSubscribedUsers();
          this.resourcesLoaded1 = true ;
          this.resourcesLoaded2 = true ;
        }
        else{
          this.toastr.error("Abnormal Error Please try Again","Ops")
          this.resourcesLoaded1 = true ;
          this.resourcesLoaded2 = true ;
        }
      }))
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => {
      subscription.unsubscribe();
   });  }


}
