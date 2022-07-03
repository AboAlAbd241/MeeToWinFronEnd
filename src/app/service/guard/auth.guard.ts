import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpRequestService } from '../httpRequest/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router : Router,
    private authenticationService : AuthService,
    private httpReqService : HttpRequestService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
          // Block component rendering until a response came from HeartBeat
          // return this.checkAndWaitToken().pipe(map(response => {
          //     return true;
          // })).pipe(catchError((err) => { return of(false); }));
          return true;
      } else {
          this.router.navigate(['/login']);
      }

      // not logged in so redirect to login page with the return url
      return false;
  }

  checkAndWaitToken(){
    var payload = {
                    apiName: 'hearbeat',
                    queryParams: {}, // should be object
                    body: {}, // should be object if the call is POST
                    urlParams: [], // should be array
                    isServerData: true, // send false to get local json data
                    method: 'GET'
            }

            const response = this.httpReqService.makeHttpRequest(payload);
            return response;
  }

}
