import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  form:FormGroup;
  constructor(builder:FormBuilder) { 
    this.form= builder.group({
      username:["", Validators.required],
      email:["", Validators.required],
      password:["", Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    console.log("form", form);
    console.log({form})
  }

}
