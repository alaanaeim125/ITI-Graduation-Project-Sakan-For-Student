import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPageService } from 'src/app/service/admin-page.service';
import { Post } from 'src/app/view_model/post';
import { environment } from 'src/environments/environment';
import { Owner } from 'src/app/view_model/owner';
import { OwnerService } from 'src/app/service/owner.service';


@Component({
  selector: 'app-view-post-admin',
  templateUrl: './view-post-admin.component.html',
  styleUrls: ['./view-post-admin.component.scss']
})


export class ViewPostAdminComponent implements OnInit {

  selectedPost:Post;
  ownerOfPost:Owner;
  postDate:string="";

  constructor(private activeSer: ActivatedRoute, private adminServ: AdminPageService
    ,private OwnerService:OwnerService) { 

    this.selectedPost = new Post();
    this.ownerOfPost=new Owner(); 
   }

  ngOnInit() {
    
    const id = this.activeSer.snapshot.params.id;

    this.adminServ.viewPostById(id).subscribe((data) => {
    
      this.selectedPost = data;
      this.selectedPost.ImageUrl=`${environment.Api_Url}`+this.selectedPost.ImageUrl;
      this.postDate=this.selectedPost.Date.toString().substr(0,10);
      this.OwnerService.getOwnerByPostID(id)
      .subscribe((res)=>{
        this.ownerOfPost=res;
        
      });

    });
  }

}
