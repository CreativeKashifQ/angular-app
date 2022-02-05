import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';
import { NgComponent} from '../../Helper/ng-component'
import * as moment from 'moment'
interface IResponse<T>{
  records: T[]
}
interface IEvent {
  category: string
  created_at: string
  date: string
  end_time: string
  id: number
  name: string
  place_latlng: string
  place_name: string
  roles: string
  start_time: string
  status: string
  updated_at: string
  url: string
  user_id: string
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent extends NgComponent implements OnInit {
   events !: IEvent[]
   moment : any = moment
  constructor(private eventService: EventService , private router:Router) {
    super()
  }

  ngOnInit(): void {
    this.eventService.myEvents().subscribe(
      (res) => {
        const response = res as IResponse<IEvent>
        this.events = response.records
        console.log(this.events);

      },
      (ex) => this.handleException(ex)

    )
  }

}
