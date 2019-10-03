import { Component, OnInit } from '@angular/core';
import {  FormGroup,FormControl, Validators,NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../../view_model/post';
import { PostService } from '../../../service/post.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ToastService } from 'src/app/service/toast.service';


const URL = 'http://localhost:5000/api/upload';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  
  showSuccessOrFailMessage:string="";
  savedImgUrl:string="";

  PostForm=new FormGroup({
    _id: new FormControl(''),
    Date:new FormControl(''),
    Governar: new FormControl('', [
      Validators.required
    ]),
    District: new FormControl('', [
      Validators.required
    ]),
    Area: new FormControl('',[
      Validators.required,
      Validators.minLength(2)
    ]),
    NumberOfRooms: new FormControl('',[
      Validators.required
    ]),
    Price: new FormControl('',[
      Validators.required
    ]),
   
    Street: new FormControl('',[
      Validators.required
    ]),
    NumberOfBeds: new FormControl('',[
      Validators.required
    ]),
    Available_NumberOfBeds: new FormControl('',[
      Validators.required
    ]),
    ImageUrl: new FormControl(''),
    Details: new FormControl('',[
      Validators.required
    ])
  });


  get Governar() { return this.PostForm.get('Governar'); }
  get District() { return this.PostForm.get('District'); }
  get Area() { return this.PostForm.get('Area'); }
  get NumberOfRooms() { return this.PostForm.get('NumberOfRooms'); }
  get Price() { return this.PostForm.get('Price'); }
  get Street() { return this.PostForm.get('Street'); }
  get NumberOfBeds() { return this.PostForm.get('NumberOfBeds'); }
  get ImageUrl() { return this.PostForm.get('ImageUrl'); }
  get Details() { return this.PostForm.get('Details'); }
  get Available_NumberOfBeds() { return this.PostForm.get('Available_NumberOfBeds'); }

  selectedOwnerID:string;
  selectedPostID:string;
  selectedPost:Post;
  customePost:Post;

  constructor(private PostService:PostService,
    private  router:Router,private ToastService:ToastService,
    private  ActivatedRoute:ActivatedRoute) { 
      this.selectedPost=new Post();
      this.customePost=new Post();
    }

  ngOnInit() {
    this.selectedPostID=this.ActivatedRoute.snapshot.params['id'];
    this.PostService.getPostByID(this.selectedPostID)
    .subscribe((res)=>{

      this.selectedPost=res;
      this.savedImgUrl=this.selectedPost.ImageUrl;
    },
    (err)=>{ 

    });

    
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

    };
  }

  UpdatePost(){  
console.log("area="+this.PostForm.value.Area);
    this.customePost.Area=this.PostForm.value.Area;
    this.customePost.Available_NumberOfBeds=this.PostForm.value.Available_NumberOfBeds;
    this.customePost.Date=this.PostForm.value.Date;
    this.customePost.Details=this.PostForm.value.Details;
    this.customePost.District=this.PostForm.value.District;
    this.customePost.Governar=this.PostForm.value.Governar;
    this.customePost.NumberOfBeds=this.PostForm.value.NumberOfBeds;
    this.customePost.NumberOfRooms=this.PostForm.value.NumberOfRooms;
    this.customePost.Price=this.PostForm.value.Price;
    this.customePost.Street=this.PostForm.value.Street;
    this.customePost._id=this.PostForm.value._id;
    this.customePost.status=this.PostForm.value.status;

    console.log("this.PostForm.value.ImageUrl="+this.PostForm.value.ImageUrl);
    
    if(this.PostForm.value.ImageUrl=="")
    {
      this.customePost.ImageUrl= this.savedImgUrl;
       console.log("this.savedImgUrl="+this.savedImgUrl);
       console.log("empty img");
       setTimeout(()=>{
        this.PostService.UpdatePostBySameImage(this.selectedPostID ,this.customePost)
         .subscribe(
           (data) => {
            
            this.ToastService.showSuccessToaster("تم التعديل بنجاح","حالة التعديل",2000);
            setTimeout(()=>{
            this.router.navigate(['']);
    
          },3000);
           },
           (err) => {
            console.log(err);
    
            this.ToastService.showFailedToaster("فشل في التعديل","حالة التعديل",2000);
            setTimeout(()=>{
            this.router.navigate(["/editPost/selectedPostID"]);
               },3000);
          });      
        },2000);
    }
    else
    {
      this.customePost.ImageUrl=this.PostForm.value.ImageUrl;
      console.log("this.PostForm.value.ImageUrl="+this.PostForm.value.ImageUrl);
       console.log("found img");
       setTimeout(()=>{
        this.PostService.UpdatePost(this.selectedPostID ,this.customePost)
         .subscribe(
           (data) => {
            
            this.ToastService.showSuccessToaster("تم التعديل بنجاح","حالة التعديل",2000);
            setTimeout(()=>{
            this.router.navigate(['']);
    
          },3000);
           },
           (err) => {
            console.log(err);
    
            this.ToastService.showFailedToaster("فشل في التعديل","حالة التعديل",2000);
            setTimeout(()=>{
            this.router.navigate(["/editPost/selectedPostID"]);
               },3000);
          });      
        },2000);
    }

    console.log("this.custImage="+this.customePost.ImageUrl);

   
  }

  onSubmit(){
   
    this.UpdatePost();
   
  }

}