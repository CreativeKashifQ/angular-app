import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  filestring: any

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<Object> {
    return this.http.post('register', user);
  }

  login(user: any) {
    return this.http.post('login', user);
  };

  // callSocialite(provider: String) {
  //   return this.http.get('social-login/' + provider);
  // }

  callFacebookSocialite(user: any | null) {
    return this.http.post('login-with-facebook', user);
  }

  callGoogleSocialite(user: any | null) {
    return this.http.post('login-with-google', user);
  }

  user() {
    return this.http.get('user');
  }

  updateUser(user: any) {
    return this.http.post('update-user', user);
  }

  changePassword(user: any) {
    return this.http.post('change-password', user);
  }

  // Returns an observable
  uploadFile(filestring: any) {
    return this.http.post('upload-avatar', {'image': filestring})
  }


  verifyEmail(otp: any) {
    return this.http.post('verify-email', otp);
  }


}
