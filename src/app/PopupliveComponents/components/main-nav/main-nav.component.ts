import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgComponent } from 'src/app/Helper/ng-component';
import { AccountService } from 'src/app/Services/account.service';




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

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent extends NgComponent implements OnInit{
  user !: any
  constructor(private accountService: AccountService, private router: Router) {
    super()
  }

  // get user(): any {
  //   let user = { 'name': 'Guest', 'email': 'guest@email.com' }
  //   const userAsStr = localStorage.getItem('user');
  //   if (userAsStr) {
  //     user = JSON.parse(userAsStr);
  //   }
  //   return user;
  // }



  ngOnInit(): void {
    this.accountService.user().subscribe(
      (res)  => {
         this.user = res as IUser
      },
      (ex) => this.handleException(ex)
    )
  }


  logout() {
    localStorage.setItem('secretHash', '');
    this.router.navigate(['/'])
  }


}
