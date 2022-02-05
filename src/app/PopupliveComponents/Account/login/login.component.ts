import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { Login } from './login.model'
import { Router} from '@angular/router'
import { NgComponent } from '../../../Helper/ng-component';
import { SocialAuthService,GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';



interface IUser {
  created_at: any
  email: string
  email_verified_at: null
  id: number
  name: string
  provider: null
  provider_id: null
  role: string
  updated_at: any
}

interface IToken{
  token:string,
  user:IUser
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends NgComponent implements OnInit {
  user = new Login;
  token !: IToken
  constructor(private accountService: AccountService,private router:Router,private socialAuthService: SocialAuthService) {
    super();
  }

  attemptLogin() {
    this.accountService.login(this.user).subscribe(
      (res) => {
        const response =  res as IToken
        localStorage.setItem('secretHash',response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['dashboard'])
      },
      (ex) => this.handleException(ex)
    );
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe(
      (res) => {
        const user = res
        this.accountService.callFacebookSocialite(user).subscribe(
          (res) => {
            const response =  res as IToken
            console.log(response.user,response.token);
            localStorage.setItem('secretHash',response.token);
            // localStorage.setItem('user',JSON.stringify(response.user));
            this.router.navigate(['dashboard'])
          },
          (ex) => this.handleException(ex)
        )

      },
      (ex) => this.handleException(ex)
    )
  }


  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe(
      (res) => {
        const user = res
        this.accountService.callGoogleSocialite(user).subscribe(
          (res) => {
            const response =  res as IToken
            console.log(response.user);
            localStorage.setItem('secretHash',response.token);
            // localStorage.setItem('user',JSON.stringify(response.user));
            this.router.navigate(['dashboard'])
          },
          (ex) => this.handleException(ex)
        )

      },
      (ex) => this.handleException(ex)
    )
  }

  ngOnInit(): void {
  }

}
