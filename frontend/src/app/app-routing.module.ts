import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HackathonListComponent } from './features/hackathon-list/hackathon-list.component';
import { HackathonDetailsComponent } from './features/hackathon-details/hackathon-details.component';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
// Import other components

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'hackathons', component: HackathonListComponent },
  { path: 'hackathons/add', component: HackathonDetailsComponent }, // Add view route
  { path: 'hackathons/:id', component: HackathonDetailsComponent }, // Detail view route
  { path: '**', redirectTo: 'login' }
  // Other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }