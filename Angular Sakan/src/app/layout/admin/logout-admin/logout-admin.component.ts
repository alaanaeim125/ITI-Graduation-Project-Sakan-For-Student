import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminPageService } from 'src/app/service/admin-page.service';


@Component({
  selector: 'app-logout-admin',
  templateUrl: './logout-admin.component.html',
  styleUrls: ['./logout-admin.component.scss']
})
export class LogoutAdminComponent implements OnInit {

  constructor(private AdminPageService:AdminPageService,private Router:Router) { }

  ngOnInit() {

    this.onLogout();

  }

  onLogout(){

    this.AdminPageService.deleteToken();

    localStorage.setItem('currentAdminId',"");

      this.Router.navigate(['/loginAdmin']).then(()=>{
        window.location.reload();
      });


  }

}
