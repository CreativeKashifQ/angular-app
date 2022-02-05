import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  showEvents() : Observable<Object> {
    return this.http.get('show-events');
  }

  showCategories():Observable<Object> {
    return this.http.get('show-categories');
  }

  filterEvents(filter:object): Observable<Object> {
    return this.http.post('filter-events',filter)
  }

  myEvents(){
    return this.http.get('my-events');
  }
}
