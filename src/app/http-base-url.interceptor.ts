import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpBaseUrlInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,PUT',
    'enctype': 'multipart/form-data',
    'Authorization' : `Bearer ${localStorage.getItem('secretHash')}`
  })
    const baseUrl = 'https://popuplive.net/api/';
    const apiReq = request.clone({ url: `${baseUrl}${request.url}`,headers: headers});
    return next.handle(apiReq);
  }
}
