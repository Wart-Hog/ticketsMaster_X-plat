import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-make-admin',
  templateUrl: './make-admin.page.html',
  styleUrls: ['./make-admin.page.scss'],
})
export class MakeAdminPage implements OnInit {

  constructor(private userService: UserService,public toastController: ToastController) { }
  usernameToPromove = ""
  admin = false
  errorModifyAdmin = ""

  ngOnInit() {
  }
  async adminToast(username) {
    const toast = await this.toastController.create({
      message: `${ username } promoted!`,
      duration: 2000
    });
    toast.present();
  }
  async makeAdmin (){
    try {
      await this.userService.modifyAdmin(this.admin, this.usernameToPromove)
      this.adminToast(this.usernameToPromove)
      //window.location.reload()
    } catch (error) {
      this.errorModifyAdmin="utente non trovato"
      return
    }
  }

}
