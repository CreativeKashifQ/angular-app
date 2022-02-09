import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import { NgComponent} from '../../../Helper/ng-component'

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent extends NgComponent implements OnInit {

  constructor(private accountService: AccountService,private router:Router) { super() }
  otp : any
  ngOnInit(): void {
  }

  verifyEmail(){
    this.setBusy()
    const instance = this
    const obj = {'otp':this.otp}
    this.accountService.verifyEmail(obj).subscribe(
      (res) =>{
        instance.clearBusy()
        this.router.navigate(['dashboard'])
      },
      (ex) => {
        instance.clearBusy()
        this.handleException(ex)
      }
    )
  }

}
