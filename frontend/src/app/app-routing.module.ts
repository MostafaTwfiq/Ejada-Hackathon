import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HackathonListComponent } from './features/hackathon-list/hackathon-list.component';
import { HackathonDetailsComponent } from './features/hackathon-details/hackathon-details.component';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { TeamRegistrationComponent } from './features/team-registration/team-registration.component';
// Import other components

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'hackathons', component: HackathonListComponent, canActivate: [AuthGuard] },
  { path: 'hackathons/add', component: HackathonDetailsComponent, canActivate: [AuthGuard] }, // Add view route
  { path: 'hackathons/:id', component: HackathonDetailsComponent, canActivate: [AuthGuard] }, // Detail view route
  { path: 'teams/add/:id', component: TeamRegistrationComponent, canActivate: [AuthGuard] }, // Add team route
  { path: '**', redirectTo: 'login' }
  // Other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }