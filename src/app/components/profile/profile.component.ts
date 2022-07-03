import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { HttpRequestService } from 'src/app/service/httpRequest/http-request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit ,OnDestroy {

  userId : any ;
  userInfo : any ;
  subscription = [] ;
  resourcesLoaded : boolean = false ;
  isMyProfile = false ;
  createdEvent ;

  constructor(private router : Router, private httpReq : HttpRequestService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    // to check from where the user came and send the req
    this.getUserInfo();

    this.getNumberOfCreatedEvents()

  }

  getUserInfo(){
    if(this.router.url == "/my-profile")
      this.getUserProfile("myProfile")
    else{
      this.getUserId();
      this.getUserProfile("profile");
    }
  }

  getUserId(){
    this.activatedRoute.params.subscribe(params => {
      this.userId =  params['id'];
      });
  }

  getNumberOfCreatedEvents(){
    let payload={
      apiName : "numOfEventCreated",
      method : "GET",
      body : {id : this.userId}
    }

    this.subscription.push(this.httpReq.makeHttpRequest(payload).pipe(map(function(res){
      return res;
  })).subscribe(data => {
      this.createdEvent=data.numberOfEvents;
    }))
  }

  getUserProfile(apiName){
    var payload = {
      apiName: apiName,
      body: {id : this.userId},
      method: 'GET'
    };

      this.subscription.push(this.httpReq.makeHttpRequest(payload).pipe(map(function(res){
        return res;
    })).subscribe(data => {
         this.userInfo = data ;
         this.resourcesLoaded = true ;
      }))
  }

  openChat(){
    this.router.navigate(["/chat",this.userId])
  }


  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => {
      subscription.unsubscribe();
   });

  }

}
