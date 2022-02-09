import { Component, OnInit } from '@angular/core';
import {NgComponent} from '../../../Helper/ng-component'
import { AccountService } from 'src/app/Services/account.service';
import { Router } from '@angular/router';

interface IUser{
  created_at: any
  email: string
  email_verified_at: null
  id: number
  name: string
  provider: null
  provider_id: null
  role: string
  updated_at:any
}
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent extends NgComponent implements OnInit {
  user : any = {}
  constructor(private accountService: AccountService,private router:Router) {
    super()
  }

  ngOnInit(): void {
    this.setBusy()
    const instance = this
    this.accountService.user().subscribe(
      (res)  => {
        instance.clearBusy()
        this.user = res as IUser

      },
      (ex) => {
        instance.clearBusy()
        this.handleException(ex)
      }
    )
  }

  updateUser(){
    this.setBusy()
    const instance = this
    this.accountService.updateUser(this.user).subscribe(
      (res) => {
        instance.clearBusy()
        this.router.navigate(['profile'])
      },
      (ex) => {
        instance.clearBusy()
        this.handleException(ex)
      }
    )
  }

}
