import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  
  form:FormGroup;
  
  constructor(private loginService: LoginService,builder:FormBuilder) { 
    
    this.form = builder.group({
      username:["", Validators.required],
      password:["", Validators.required],
    })
  }
  ngOnInit(): void {
  }

  async login (username, password){
    try{
    
      this.token = await this.loginService.login(username, password)
      sessionStorage.setItem("token", this.token)
      sessionStorage.setItem("username", username)
      window.location.reload()
    }catch(errror: any){
      this.errorMessage = "credenziali errate"
      return  
    }
  }
  onSubmit(form:any){
    this.login(form.username, form.password,)
  }

}
