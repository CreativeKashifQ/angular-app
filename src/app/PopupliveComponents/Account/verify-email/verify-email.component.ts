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
    const obj = {'otp':this.otp}
    this.accountService.verifyEmail(obj).subscribe(
      (res) => this.router.navigate(['dashboard']),
      (ex) => this.handleException(ex)

    )
  }

}
