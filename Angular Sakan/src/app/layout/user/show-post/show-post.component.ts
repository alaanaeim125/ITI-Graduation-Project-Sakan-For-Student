import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/service/home.service';
import {ActivatedRoute} from '@angular/router';
import { Post } from 'src/app/view_model/post';
import { Owner } from 'src/app/view_model/owner';
import { OwnerService } from 'src/app/service/owner.service';


@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent implements OnInit {

  post:Post;
  ownerOfPost:Owner;
  constructor(private HomeService:HomeService,private ActivatedRoute:ActivatedRoute,
    private OwnerService:OwnerService) {
    this.post=new Post();
    this.ownerOfPost=new Owner();
   }

  ngOnInit() {

    let stringID=this.ActivatedRoute.snapshot.paramMap.get('id');

  this.HomeService.getPostShow(stringID).subscribe(
    (res)=>{
     // console.log("res="+res);
      this.post.Governar=res.Governor;
      this.post.District=res.District;
      this.post.Area=res.Area;
      this.post.Details=res.Details;
      this.post.NumberOfBeds=res.NumberOfBeds;
      this.post.NumberOfRooms=res.NumberOfRooms;
      this.post.Price=res.Price;
      this.post.Street=res.Street;
      this.post.ImageUrl="http://localhost:5000/"+res.ImageUrl;
      this.post.Date=res.Date.substr(0,10);
      this.post.Available_NumberOfBeds=res.Available_NumberOfBeds;

      this.OwnerService.getOwnerByPostID(stringID)
      .subscribe((res)=>{
        this.ownerOfPost=res;
      //  console.log(this.ownerOfPost);
      });
    
    }
  ,(err)=>{
      console.log(err);
  });
  

  }

}
