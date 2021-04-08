import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { IUser } from '../../../../../BackEnd/src/Interfaces/IUser';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  user!:IUser 
  name = ""
  username = ""
  password = ""
  errorMessage = ""
  constructor(private userService: UserService, private loginService: LoginService,public toastController: ToastController) { }

  async ngOnInit() {
    try{
        this.user = await this.loginService.getUser()
        this.username = this.user.username
        this.name = this.user.name
        this.password = this.user.password
    }catch(err){
      return err
    }
  }
  async updateToast() {
    const toast = await this.toastController.create({
      message: 'Data Updated!',
      duration: 2000
    });
    toast.present();
  }
  async modifyUser() {
    try{
      await this.userService.modifyUser(this.name, this.username, this.password)
      sessionStorage.setItem("username", this.username)
      this.updateToast()
      //window.location.reload()
    }catch(error: any){
      this.errorMessage="username già esistente o password invalida"
      return
    }
  }
}
