import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public username = ""
  public password = ""
  public token = ""
  public errorMessage = ""
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  async login (){
    try{
      this.token = await this.loginService.login(this.username, this.password)
      sessionStorage.setItem("token", this.token)
      sessionStorage.setItem("username", this.username)
      window.location.reload()
    }catch(errror: any){
      this.errorMessage = "credenziali errate"
      return  
    }
  }

}
