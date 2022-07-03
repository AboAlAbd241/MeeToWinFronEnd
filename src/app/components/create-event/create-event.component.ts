import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/service/httpRequest/http-request.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  eventInfo = {
    title : "test",
    description : "test",
    price : "10",
    numOfPlayers : "20",
    duration : "30",
    date : ""
  }

  constructor(private router : Router, private httpReq : HttpRequestService, private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  createEvent(){
    const paylod = {
      method : "post",
      apiName : "createEvent",
      body : this.eventInfo
    }

    this.httpReq.makeHttpRequest(paylod).subscribe(data =>{
      if(data['status'] == "success"){
        this.toastr.success('Your Activity has been added successfully', 'Successfull');
        this.router.navigate(['/home']);
      }
      else{
        this.toastr.error('Abnormal Error Please try again', 'Somthing went wrong');
      }
    })
  }

}
