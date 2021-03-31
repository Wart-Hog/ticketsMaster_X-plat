import { Component, OnInit } from '@angular/core';
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
  constructor(private userService: UserService, private loginService: LoginService) { }

  async ngOnInit() {
    try{
        this.user = await this.loginService.getUser()
        this.username = this.user.username
    }catch(err){
      return err
    }
  }

  async modifyUser() {
    try{
      await this.userService.modifyUser(this.name, this.username, this.password)
      sessionStorage.setItem("username", this.username)
      window.location.reload()
    }catch(error: any){
      this.errorMessage="username già esistente o password invalida"
      return
    }
  }
}
