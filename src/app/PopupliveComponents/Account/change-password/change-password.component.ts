import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import {NgComponent} from '../../../Helper/ng-component'

interface IPassword{
  oldpassword: any
  password:any
  password_confirm:any
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends NgComponent implements OnInit {
  user : any = {}
  constructor(private accountService: AccountService,private router:Router) {
    super()
  }

  ngOnInit(): void {

  }


  changePassword(){
    this.accountService.changePassword(this.user as IPassword).subscribe(
    (res) => this.router.navigate(['/profile']),
    (ex) => this.handleException(ex)

    )
  }

}
