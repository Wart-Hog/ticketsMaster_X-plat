import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  getEvents: IEvent[]
  theatreEvents: IEvent[]
  public id = []
  public toShow =""
  public isLogged = false
  imgUrl = ""
  
  images = [
    "https://s3.amazonaws.com/thumbnails.venngage.com/template/2c539e44-a6b9-415f-93c5-fc6cb6fb9e11.png",
    "https://image.freepik.com/premium-vector/jazz-festival-live-music-concert-poster-advertisement-banner_48369-16523.jpg",
    "https://cdn.w600.comps.canstockphoto.com/vector-music-concert-poster-of-sketch-clip-art-vector_csp57317766.jpg",
    "https://media.gettyimages.com/vectors/live-drive-in-concert-event-poster-design-advertisement-vector-id1265820821",
    "https://lh3.googleusercontent.com/proxy/DoZT1eL234TmtYHt5IXANhXgBAZiAnBFeACFXzZ7AIWOqUrsEbpC6LXYE8F_25oKNxw4wQtr_0YplJ7g-QxBaXzm3IKva_YtevhPt_J4a6s7D5gk_RjAPwD6efV6pu29iURNqxVQHdc",
    "https://i.pinimg.com/originals/4c/1f/32/4c1f323ed5862fada802801bf12859db.jpg",
    "https://pbs.twimg.com/media/DoGR5U2VAAEXWqb.jpg",
    "https://image.freepik.com/free-vector/theatre-poster-illustration_1284-9599.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVc2b7S8NbR5ElPWkgHFfKo_DgKrwMec42Ng&usqp=CAU",
    "https://i.pinimg.com/564x/2b/a9/72/2ba972d156ef2336e6a8946f170f711e.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4bade851251579.58e71fbb22408.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8DHjMLedxLrTo_1pCrB4thrSTz3mqIF-Rbg&usqp=CAU",
    "https://thumbs.dreamstime.com/z/keep-running-poster-best-gesign-colorful-poster-template-sport-event-marathon-championship-can-be-used-card-keep-running-123650914.jpg",
    "https://image.shutterstock.com/z/stock-vector-sport-event-poster-70275826.jpg",
    "https://comps.canstockphoto.com/keep-running-best-gesign-colorful-poster-clipart-vector_csp59959054.jpg"

  ]
  constructor(private eventService: EventService, private userService: UserService,public toastController: ToastController) { }
  

  buyTicket = async (i:number) =>{
    sessionStorage.setItem("ticket", this.getEvents[i].id)
    try{
      await this.userService.buyTicket()
      this.cartToast()
    }catch(err){
      return err
    }
  }
  async cartToast() {
    const toast = await this.toastController.create({
      message: 'Added to cart',
      duration: 1400
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

  addFavorite = async (i:number) =>{
    sessionStorage.setItem("favorite", this.getEvents[i].id)
    try{
      await this.userService.addFavorite()
      this.favouriteToast()
    }catch(err){
      return err
    }
  }

  async ngOnInit() {
    this.checkLogged()
    console.log(this.getImage())
  }

  getFromInput(myInput){
    this.getEvents = myInput
  }

  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }

  getImage = (): String => this.images[Math.floor(Math.random() * (15 - 0) + 0)]
}
