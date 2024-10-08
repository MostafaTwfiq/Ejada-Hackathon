import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HackathonListComponent } from './features/hackathon-list/hackathon-list.component';
import { HackathonDetailsComponent } from './features/hackathon-details/hackathon-details.component';
import { TeamRegistrationComponent } from './features/team-registration/team-registration.component';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './features/interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { DatePipe } from '@angular/common';
import { RtlDirective } from 'src/directives/rtl.directive';
import { TeamDetailsComponent } from './features/team-details/team-details.component';
import { BaseComponent } from './features/base/base.component';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HackathonListComponent,
    HackathonDetailsComponent,
    TeamRegistrationComponent,
    LoginComponent,
    SignupComponent,
    RtlDirective,
    TeamDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
