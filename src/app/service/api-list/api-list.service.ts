import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiListService {

  authUrl = environment.authUrl;
  appUrl = environment.appUrl;

  // Add server urls in below object
  serverUrlPath = {
    // not auth request
    login : "/login",
    eventList : "/EventsController/events",
    eventDetails : "/EventsController/events-details",
    subscribedUsers : "/EventInfoController/not-auth-subscribed-users",
    numOfEventCreated : "/ProfileController/event-created",
    availableUsers : "/EventInfoController/available-users",
    profile : "/ProfileController/profile",
    google : "/oauth2/google",



    // need auth token
    subscribedUsersAuth : "/EventInfoController/subscribed-users",
    myProfile : "/ProfileController/my-profile",
    createEvent : "/EventsController/create-event",
    enrollUser : "/EventInfoController/enroll-user",
    unEnrollUser : "/EventInfoController/un-enroll-user",
    getUsersChat : "/users-chat",
    getMessages : "/getMessages"
  };


  constructor() { }

  /**
   * This function is used to create and return api url
   * @param apiName - name of the api.
   (        data fron the server or from a local Json file.
    */
  getUrl(apiName) {
    return this.authUrl + this.serverUrlPath[apiName];
  }

}
