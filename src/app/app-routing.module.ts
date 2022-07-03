import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { CardsComponent } from './components/cards/cards.component';
import { ChatComponent } from './components/chat/chat.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './service/guard/auth.guard';

const routes: Routes = [ {
  path: "login",
  component: LoginComponent
},
{
  path: "home",
  component: CardsComponent
},
{
  path: "card-info/:id",
  component: CardInfoComponent
},
{
  path: "create-event",
  component: CreateEventComponent,
  canActivate: [AuthGuard]
},
{
  path: "profile/:id",
  component: ProfileComponent
},
{
  path: "my-profile",
  component: ProfileComponent
},
{
  path: "chat",
  component: ChatComponent,
  canActivate: [AuthGuard]
},
{
path: "chat/:id",
component: ChatComponent,
canActivate: [AuthGuard]
},
{
  path: "**",
  component: CardsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
