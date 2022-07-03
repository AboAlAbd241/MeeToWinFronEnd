import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() fromLoginPage : boolean = true ;
  isLoggedIn = false ;

  constructor(private router: Router, private authService : AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.currentUserValue ? true : false ;
  }

  onSignOut(){
    this.authService.logout();
    if(this.router.url == "/home")
      location.reload();
    else
      this.router.navigate(['/home']);
  }

}
