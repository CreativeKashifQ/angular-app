import { Component, OnInit } from '@angular/core';
import { Register } from './register.model';
import { AccountService } from '../../../Services/account.service'
import {Router} from '@angular/router'
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends NgComponent implements OnInit {
  user = new Register();
  socialUser!: SocialUser;
  isLoggedin!: boolean ;

  roles = [
    {id:1 ,  select:false, name:'Venue Provider' },
    {id:2 ,  select:false, name:'Event Host' },
    {id:3 ,  select:false, name:'Food Supplier' },
    {id:4 ,  select:false, name:'Musical Artist' },
  ]
  selectedRoles: any = []
  constructor(private accountService: AccountService,private router:Router,private socialAuthService: SocialAuthService ) {
    super()
  }

  onChangeRole(event:any){
    const selectedValue = event.target.value;
    const isChecked = event.target.checked;
    if(isChecked){
      this.selectedRoles.push(selectedValue)
    }else{
      const removeIndex = this.selectedRoles.findIndex((value : any) => value === selectedValue)
      if(removeIndex != -1){
        this.selectedRoles.splice(removeIndex,1)
      }
    }

  }


  attemptRegister() {
    this.user.roles = this.selectedRoles
    this.setBusy();
    this.accountService.registerUser(this.user).subscribe(
        (res) => {
          const response =  res as IToken
          console.log(response.user);

          localStorage.setItem('secretHash',response.token);
          // localStorage.setItem('user',JSON.stringify(response.user));
          this.router.navigate(['verify-email'])
        },
        (ex) => this.handleException(ex),
        () => this.clearBusy()
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

  // attemptSocialite(provider: any) {
  //   this.setBusy();
  //   this.accountService.callSocialite(provider).subscribe(
  //     (res) => this.router.navigate(['dashboard']),
  //     (ex) => console.log(ex),
  //     // (ex) => this.handleException(ex),
  //     () => this.clearBusy()
  //   );
  // }


  signOut(): void {
    this.socialAuthService.signOut();
  }

  ngOnInit(): void {}

}
