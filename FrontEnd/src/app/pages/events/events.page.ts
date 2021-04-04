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
  selected = [
    {
      name: "music",
      value: false
    },
    {
      name: "theatre",
      value: false
    },
    { 
      name: "sport",
      value: false
    }
  ]
  images = {
    music: [
      "https://s3.amazonaws.com/thumbnails.venngage.com/template/2c539e44-a6b9-415f-93c5-fc6cb6fb9e11.png",
      "https://image.freepik.com/premium-vector/jazz-festival-live-music-concert-poster-advertisement-banner_48369-16523.jpg",
      "https://cdn.w600.comps.canstockphoto.com/vector-music-concert-poster-of-sketch-clip-art-vector_csp57317766.jpg",
      "https://media.gettyimages.com/vectors/live-drive-in-concert-event-poster-design-advertisement-vector-id1265820821",
      "https://i.pinimg.com/originals/4c/1f/32/4c1f323ed5862fada802801bf12859db.jpg",
      "https://media.istockphoto.com/vectors/music-poster-template-for-rock-concert-octopus-is-holding-microphone-vector-id609079650",
      "https://media.istockphoto.com/vectors/music-poster-template-for-rock-concert-raven-is-holding-microphone-vector-id611611178",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUV6yqIzgUxM4yZxsFA2yjo43EP472B1Y-Lw&usqp=CAU",
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/classic-music-event-poster-design-template-caad137757b1d89fe56eca0d65378d42.jpg?ts=1579263151"
    ],
    theatre: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/disp/e0e59957213685.56015919d35b3.jpg",
      "https://pbs.twimg.com/media/DoGR5U2VAAEXWqb.jpg",
      "https://image.freepik.com/free-vector/theatre-poster-illustration_1284-9599.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVc2b7S8NbR5ElPWkgHFfKo_DgKrwMec42Ng&usqp=CAU",
      "https://i.pinimg.com/564x/2b/a9/72/2ba972d156ef2336e6a8946f170f711e.jpg",
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/stage-event-concert-theatre-flyer-template-design-baaa69b3056127cf575f257823e75434_screen.jpg?ts=1566574693",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc94jfLHpnVqyiqX50QE7zRo_Fs_JOp_wa2A&usqp=CAU",
      "https://i.pinimg.com/originals/69/15/cf/6915cfa48c3b9b4ace0feec659c1ff02.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51ABLZBD0%2BL._AC_.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT5ZQlOAWBYD01fmFayf1s7y0SkOH_Upifcw&usqp=CAU"
    ],
    sport: [
      "https://d3j2s6hdd6a7rg.cloudfront.net/v2/uploads/media/default/0002/08/771499b4dd169db7fb83b5653cb7939c36084ea9.jpeg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4bade851251579.58e71fbb22408.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8DHjMLedxLrTo_1pCrB4thrSTz3mqIF-Rbg&usqp=CAU",
      "https://thumbs.dreamstime.com/z/keep-running-poster-best-gesign-colorful-poster-template-sport-event-marathon-championship-can-be-used-card-keep-running-123650914.jpg",
      "https://image.shutterstock.com/z/stock-vector-sport-event-poster-70275826.jpg",
      "https://comps.canstockphoto.com/keep-running-best-gesign-colorful-poster-clipart-vector_csp59959054.jpg",
      "https://i.pinimg.com/originals/85/d4/c3/85d4c3d628dacad2af1461144421f03d.jpg",
      "https://i.pinimg.com/originals/d1/71/64/d1716482886ef618104cb4139d94881d.jpg",
      "https://i.pinimg.com/originals/55/13/44/5513441899177f57b4860a23ec90535d.jpg"

    ]
  }
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
    this.selected.map(item => item.name == myInput[0].type ? item.value = true : item.value = false)
    console.log(this.selected)
  }

  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }

  getImage = (): String => this.images[Math.floor(Math.random() * (15 - 0) + 0)]
}
