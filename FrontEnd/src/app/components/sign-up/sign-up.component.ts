import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule,FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  form:FormGroup;
  public errorMessage = ""
  private formSubmitAttempt: boolean;

  constructor(private userService: UserService,private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.form= this.formBuilder.group({
      name:["", Validators.required],
      username:["", Validators.required],
      password:["", Validators.required]
      //password:["", Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])],
    })
  }
  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt);
  }
  
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  signup = async (name,username,password) => {
    try{
      await this.userService.signup(name,username,password)
      //window.location.replace("http://localhost:4200/login")
    }catch(error: any){
      this.errorMessage="password must be 6 char long, username must be unique"
      return
    }
  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
  onSubmit(form:any){
    this.formSubmitAttempt = true
    if (this.form.valid) {
      console.log('form submitted');
      this.signup(form.name,form.username,form.password)

    } else {
      this.validateAllFormFields(this.form); //{7}
    }
  }


}
