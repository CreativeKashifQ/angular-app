import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './PopupliveComponents/dashboard/dashboard.component';
import { RegisterComponent } from './PopupliveComponents/Account/register/register.component';
import { LoginComponent } from './PopupliveComponents/Account/login/login.component';
import { HttpBaseUrlInterceptor } from './http-base-url.interceptor';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ProfileComponent } from './PopupliveComponents/Account/profile/profile.component';
import { SettingsComponent } from './PopupliveComponents/Account/settings/settings.component';
import { MainNavComponent } from './PopupliveComponents/components/main-nav/main-nav.component';
import { EditProfileComponent } from './PopupliveComponents/Account/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './PopupliveComponents/Account/change-password/change-password.component';
import { EventsComponent } from './PopupliveComponents/events/events.component';
import { VerifyEmailComponent } from './PopupliveComponents/Account/verify-email/verify-email.component';
import { FacebookLoginProvider,GoogleLoginProvider, SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
    MainNavComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    EventsComponent,
    VerifyEmailComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxDaterangepickerMd.forRoot(),
    SocialLoginModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpBaseUrlInterceptor, multi: true
    },

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '966342190978579'
            )
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '845060448968-qud1tkvpunocsqer43210a3idn3gu812.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
