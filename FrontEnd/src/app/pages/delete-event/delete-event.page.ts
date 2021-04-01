import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.page.html',
  styleUrls: ['./delete-event.page.scss'],
})
export class DeleteEventPage implements OnInit {

  constructor(private eventService:EventService) { }
  errorDeleteEvent = ""
  eventId = ""

  ngOnInit() {
  }
  deleteEvent = async () => {
    try{
      await this.eventService.deleteEvent(this.eventId)
      //window.location.reload()
    }catch(err){
      this.errorDeleteEvent="event not found"
      return
    }
  }
}
