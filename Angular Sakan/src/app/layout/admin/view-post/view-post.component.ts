import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPageService } from 'src/app/service/admin-page.service';
import { Post } from 'src/app/view_model/post';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})


export class ViewPostComponent implements OnInit {

  selectedPost:Post;
  postDate:string="";
  
  constructor(private activeSer: ActivatedRoute, private adminServ: AdminPageService) { 
    this.selectedPost = new Post();
  }

  ngOnInit() {
    const id = this.activeSer.snapshot.params.id;
    this.adminServ.viewPostById(id).subscribe((data) => {
      this.selectedPost = data;
      this.postDate=this.selectedPost.Date.toString().substr(0,10);
      this.selectedPost.ImageUrl="http://localhost:5000/"+this.selectedPost.ImageUrl;
    });
  }

}


