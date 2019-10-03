import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormLoginService } from 'src/app/service/form-login.service';

@Component({
  selector: 'app-logout-user',
  templateUrl: './logout-user.component.html',
  styleUrls: ['./logout-user.component.scss']
})
export class LogoutUserComponent implements OnInit {

  constructor(private FormLoginService:FormLoginService,private Router:Router) { }

  ngOnInit() {

    this.onLogout();

  }

  onLogout(){

    this.FormLoginService.deleteToken();

    localStorage.setItem('currentUserId',"");

    localStorage.setItem('userProfile',"");

      this.Router.navigate(['/loginUser']).then(()=>{
        window.location.reload();
      });


  }

}
