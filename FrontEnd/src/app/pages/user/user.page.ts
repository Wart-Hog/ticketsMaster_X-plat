import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { IUser } from '../../../../../BackEnd/src/Interfaces/IUser';
import { ITicket } from '../../../../../BackEnd/src/Interfaces/ITicket';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user!:IUser 
  tickets:ITicket[] = []
  usernameToPromove = ""
  admin = false
  name = ""
  eventName = ""
  username = ""
  type = ""
  place = ""
  dateTime =""
  price: any
  eventId = ""
  
  errorEventMessage = ""
  errorModifyAdmin = ""
  errorDeleteEvent = ""
  public isLogged = false
  signUpVisible: boolean
  constructor(private loginService: LoginService,private userService: UserService, private eventService:EventService) { }

  async ngOnInit(){
    this.checkLogged()
    try{
      if(this.isLogged){
        this.user = await this.loginService.getUser()
        this.tickets = await this.userService.myTickets()
        this.admin = this.user.admin
        this.username = this.user.username
      }
      
    }catch(err){
      return err
    }
    
  }

  signUpBtnStatus(){
    this.signUpVisible = this.signUpVisible ? false : true
    console.log(this.signUpVisible);
  }

  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }

  logout(){
    sessionStorage.clear()
    window.location.reload()
  }

  removeTicket = async (i:number) =>{
    try{
      sessionStorage.setItem("ticketID", this.tickets[i].id)
      await this.userService.removeTicket()
      window.location.reload()
    }catch(err){
      return err
    }
  }
  async makeAdmin (){
    try {
      await this.userService.modifyAdmin(this.admin, this.usernameToPromove)
      window.location.reload()
    } catch (error) {
      this.errorModifyAdmin="utente non trovato"
      return
    }
  }
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
  deleteEvent = async () => {
    try{
      await this.eventService.deleteEvent(this.eventId)
      window.location.reload()
    }catch(err){
      this.errorDeleteEvent="event not found"
      return
    }
  }
  changeDataFormat =() =>{
    let newDate = this.dateTime.split("-")
    this.dateTime =  newDate[2] + "-" + newDate[1] + "-" + newDate[0]
  }
  

}
