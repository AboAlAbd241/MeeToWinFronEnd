import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first, map } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';
import { HttpRequestService } from 'src/app/service/httpRequest/http-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credential = { email : null , password : null}
  constructor(private router : Router,
             private authService : AuthService,
             private httpReq : HttpRequestService,
             public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onLogin(){

    // this.authService.currentUserValue
    this.authService.login(this.credential).pipe(first())
    .subscribe(data => {
      //return success or fail
      if(data == "success") this.router.navigate(['/home'])

    } )

      // this.router.navigate(['/home']);
  }

  openGoogle(){
    let payload = {
      method : 'post',
      body : {},
      apiName : 'google'
    }

    this.httpReq.makeHttpRequest(payload).subscribe(data=>{
      debugger
    })
  }
}


