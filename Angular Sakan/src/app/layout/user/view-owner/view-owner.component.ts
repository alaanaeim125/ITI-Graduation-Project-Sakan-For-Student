import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPageService } from 'src/app/service/admin-page.service';
import { Owner } from 'src/app/view_model/owner';
import { FormLoginService } from 'src/app/service/form-login.service';
import { Post } from '../../../view_model/post';
import { OwnerService } from '../../../service/owner.service';
import { PostService } from '../../../service/post.service';
import { post } from 'selenium-webdriver/http';
import { ToastService } from 'src/app/service/toast.service';
ToastService

@Component({
  selector: 'app-view-owner',
  templateUrl: './view-owner.component.html',
  styleUrls: ['./view-owner.component.scss']
})
export class ViewOwnerComponent implements OnInit {

  selectedOwner: Owner;
  selectedPosts:Post []=[];
  image = '../assets/sakan.jpg';
  pagesCount:Array<number>=[];
  countPostOfOwnerArray:number; 
  ArrayOfPostsStringIds:Array<string>=[];
  Post:Post;
  page:number=0;
  isOwnerHasPost:boolean=false;
  stringDate:string="";

  constructor(private activeSer: ActivatedRoute, private OwnerService: OwnerService,
    private PostService:PostService,private ToastService:ToastService,
    private FormLoginService:FormLoginService) { 
    this.selectedOwner=new Owner();
    this.Post=new Post();

  }

  ngOnInit() {

    const id = this.activeSer.snapshot.params.id;
    this.OwnerService.getOwnerByID(id).subscribe((data) => {
      this.selectedOwner = data;
      this.countPostOfOwnerArray= data.postsOfOwner.length;

      this.selectedOwner.imgUrlOwner="http://localhost:5000/"+ this.selectedOwner.imgUrlOwner;
      this.ArrayOfPostsStringIds=data.postsOfOwner;

      if(this.countPostOfOwnerArray>0)
      {
        this.page=0;
        this.pagesCount=[];
        this.isOwnerHasPost=true;
        this.getPostOfOwner(0);
      }
      else
      {
        this.page=0;
        this.pagesCount=[];
        this.stringDate="";
        this.Post=new Post();
        this.isOwnerHasPost=false;
      }

      this.getPostsOfOwnerCount();

    },(err)=>{
        console.log(err);
    });


  }


  setPage(i,event:any)
  {
    event.preventDefault();
     this.page=i;
     this.getPostOfOwner(i);
  }


  getPostOfOwner(numOfPost:number)
  {
    
    this.PostService.getPostByID(this.ArrayOfPostsStringIds[numOfPost]).subscribe((data)=>{
       this.Post=data;   
       this.stringDate=this.Post.Date.toString().substr(0,10);
       //console.log("date="+this.stringDate); 
        this.Post.ImageUrl="http://localhost:5000/"+this.Post.ImageUrl;
      //  console.log("data="+data);
      },(err)=>{
        console.log(err);
      });


 //   }
  }

  getPostsOfOwnerCount()
  {
       for(let i=0;i<this.countPostOfOwnerArray;i++)
         {
           this.pagesCount.push(i);
         }
  }


  deleteOwnerPost(ownerID,postID)
  { 
       //console.log("ownerId="+ownerID);
       //console.log("PostId="+postID);

       this.OwnerService.deletePostFromPosts(postID).subscribe(

        (res)=>{

          this.OwnerService.deletePostFromOwnerPostArray(ownerID,postID).subscribe(
            
            (data)=>{

             this.ToastService.showSuccessToaster("تم الحذف بنجاح","حذف بوست",2000);

              setTimeout(()=>{
              //  window.location.reload();
              // this.getPostsOfOwnerCount();
              
              
              this.ngOnInit();
                },2000);      
            },(err2)=>{
              this.ToastService.showFailedToaster("فشل في الحذف","حذف بوست",2000);
            }
              
          );

        
        },
        (err)=>{
          this.ToastService.showFailedToaster("فشل في الحذف","حذف بوست",2000);
          setTimeout(()=>{
          window.location.reload();
          },2000);
        }
         
       );
      
  }


}