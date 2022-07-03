import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { HttpRequestService } from 'src/app/service/httpRequest/http-request.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit , OnDestroy {

  eventsInfo : any = [] ;
  subscription : any ;
  resourcesLoaded : boolean = false ;

  constructor(private router : Router, private httpReq : HttpRequestService) { }


  ngOnInit(): void {

    this.getInfo();
  }

  openCardInfo(id : any){
    this.router.navigate(['card-info',id]);
  }

  getInfo(){

    var payload = {
      apiName: 'eventList',
      body: {},
      method: 'GET'
    };

      this.subscription = this.httpReq.makeHttpRequest(payload).pipe(map(function(res){
        return res;
    })).subscribe(data => {
          this.eventsInfo = data;
          this.resourcesLoaded = true
      })

  }

  formatDate(date){
    if(date){
      let x = [] , hour = [];
      x = date.split("T");
      let y = x[0];
      hour = x[1].split(":");
      let min = hour[1];
      hour = hour[0];
      return y + " at "+hour+":"+min;
    }
    return "";
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


 }




