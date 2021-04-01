import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-make-admin',
  templateUrl: './make-admin.page.html',
  styleUrls: ['./make-admin.page.scss'],
})
export class MakeAdminPage implements OnInit {

  constructor(private userService: UserService) { }
  usernameToPromove = ""
  admin = false
  errorModifyAdmin = ""

  ngOnInit() {
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

}
