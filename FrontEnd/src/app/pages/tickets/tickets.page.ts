import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { ITicket } from '../../../../../BackEnd/src/Interfaces/ITicket';
import { IUser } from '../../../../../BackEnd/src/Interfaces/IUser';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  public isLogged = false
  user!:IUser 
  tickets:ITicket[] = []
  username = ""
  constructor(private loginService: LoginService,private userService: UserService) { }

  async ionViewWillEnter(){
    try{
      if(this.isLogged){
        this.user = await this.loginService.getUser()
        this.tickets = await this.userService.myTickets()
        this.username = this.user.username
      }
      
    }catch(err){
      return err
    }
  }

  async ngOnInit() {
    this.checkLogged()
  }

  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }

  deleteTicket = async (i:number) =>{
    try{
      sessionStorage.setItem("ticketID", this.tickets[i].id)
      await this.userService.removeTicket()
      window.location.reload()
    }catch(err){
      return err
    }
  }
}
