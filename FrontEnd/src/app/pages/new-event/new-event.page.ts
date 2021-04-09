import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataSharingService } from 'src/app/services/data-sharing.service';
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
  constructor(private eventService:EventService, private dataSharingService: DataSharingService,public toastController: ToastController) { }

  ngOnInit() {}
  async createEvent() {
    try{
      this.changeDataFormat()
      await this.eventService.newEvent(this.eventName, this.type, this.place, this.dateTime, this.price)
      this.dataSharingService.changes.next(true);
      this.createdToast()
    }catch(error: any){
      this.errorEventMessage="dati errati"
      return
    }
  }
  async createdToast() {
    const toast = await this.toastController.create({
      message: 'Created!',
      duration: 2000
    });
    toast.present();
  }
  changeDataFormat =() =>{
    let newDate = this.dateTime.split("-")
    this.dateTime =  newDate[2] + "-" + newDate[1] + "-" + newDate[0]
  }

}
