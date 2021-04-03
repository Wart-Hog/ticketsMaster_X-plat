import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';
import { IUser } from '../../../../../BackEnd/src/Interfaces/IUser';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  public isLogged = false
  user!:IUser 
  favorites:IEvent[] = []
  username = ""
  constructor(private loginService: LoginService,private userService: UserService) { }
  
  async ionViewWillEnter(){
    try{
      if(this.isLogged){
        this.user = await this.loginService.getUser()
        this.favorites = await this.userService.getFavorites()
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
  

  deleteFavorite = async (i:number) =>{
    try{
      sessionStorage.setItem("favorite", this.favorites[i].id)
      await this.userService.removeFavorite()
      window.location.reload()
      
    }catch(err){
      return err
    }
  }

}
