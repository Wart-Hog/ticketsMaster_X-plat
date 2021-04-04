import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { EventService } from 'src/app/services/event.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
  providers: []
})
export class MusicComponent implements OnInit {
  public events : IEvent[] = []
  public isLogged = false
  public updateValues: boolean
  @Input() selected = false
  @Output() music: EventEmitter<any> = new EventEmitter<any>()
  constructor(private eventService: EventService,private dataSharingService: DataSharingService,public toastController: ToastController) {
      this.dataSharingService.changes.subscribe( async value => {
        this.updateValues = value;
        this.events = await this.eventService.getMusicEvents()
        this.checkLogged()
      });
  }

  async ngOnInit() {
    // try{
    //   this.events = await this.eventService.getMusicEvents()
    //   this.checkLogged()
    // }catch(error){
    //   return error
    // }
  }

  getMusic = () =>{
    this.music.emit(this.events)
  }

  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }
  async cartToast() {
    const toast = await this.toastController.create({
      message: 'Added to cart',
      duration: 2000
    });
    toast.present();
  }
  async favouriteToast() {
    const toast = await this.toastController.create({
      message: 'Added to favourite',
      duration: 2000
    });
    toast.present();
  }
}
