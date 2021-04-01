import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {
  eventName = ""
  type = ""
  place = ""
  dateTime =""
  price: any
  errorEventMessage = ""
  //errorDeleteEvent = ""
  constructor(private eventService:EventService) { }

  ngOnInit() {}
  async createEvent() {
    try{
      this.changeDataFormat()
      await this.eventService.newEvent(this.eventName, this.type, this.place, this.dateTime, this.price)
      //window.location.replace('http://localhost:4200')  
    }catch(error: any){
      this.errorEventMessage="dati errati"
      return
    }
  }
  changeDataFormat =() =>{
    let newDate = this.dateTime.split("-")
    this.dateTime =  newDate[2] + "-" + newDate[1] + "-" + newDate[0]
  }

}
