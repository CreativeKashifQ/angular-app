import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import { NgComponent } from '../../../Helper/ng-component'


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
  roles: any
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends NgComponent implements OnInit {

  rolesItems: any = []
  imageSrc !: any
  user : any

  constructor(private accountService: AccountService,private router:Router) {
    super()
  }

  uploadAvatar(event: any): void {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    this.setBusy()
    const instance = this
    var binaryString = readerEvt.target.result;
    const filestring = btoa(binaryString);  // Converting binary string data.
    this.accountService.uploadFile(filestring).subscribe(
        (res) => {
          this.ngOnInit()
          instance.clearBusy()
        },
        (ex) => {
          instance.clearBusy()
          this.handleException(ex)
        }

    );
  }

  // get user() : any {
  //   let user = { 'name': 'Guest', 'email': 'guest@email.com' }
  //   const userAsStr = localStorage.getItem('user');
  //   if (userAsStr) {
  //      user = JSON.parse(userAsStr);
  //   }
  //   return user
  // }

  ngOnInit(): void {
    this.setBusy()
    const instance = this;
    this.accountService.user().subscribe(
      (res) => {
        instance.clearBusy()
        this.user = res as IUser
        this.imageSrc = this.user.avatar
        this.rolesItems = this.user.roles.split(',')
      },
      (ex) => {
        instance.clearBusy()
        this.handleException(ex)
      }
    )
  }

  navigate(){
    this.router.navigate(['/dashboard'],{replaceUrl:true})
  }

}
