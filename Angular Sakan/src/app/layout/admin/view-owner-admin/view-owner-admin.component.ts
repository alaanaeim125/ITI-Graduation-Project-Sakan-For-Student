import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPageService } from 'src/app/service/admin-page.service';
import { Owner } from 'src/app/view_model/owner';
import { FormLoginService } from 'src/app/service/form-login.service';

@Component({
  selector: 'app-view-owner-admin',
  templateUrl: './view-owner-admin.component.html',
  styleUrls: ['./view-owner-admin.component.scss']
})

export class ViewOwnerAdminComponent implements OnInit {
  selectedOwner: Owner;
  image = '../assets/sakan.jpg';
  constructor(private activeSer: ActivatedRoute, private adminServ: AdminPageService,private FormLoginService:FormLoginService) { 
    this.selectedOwner=new Owner();
  }

  ngOnInit() {
    const id = this.activeSer.snapshot.params.id;
 //   console.log("ownerID="+id);
    this.adminServ.viewOwnerById(id).subscribe((data) => {
      this.selectedOwner = data;
      this.selectedOwner.imgUrlOwner = "http://localhost:5000/"+this.selectedOwner.imgUrlOwner; 
    });
  }

}