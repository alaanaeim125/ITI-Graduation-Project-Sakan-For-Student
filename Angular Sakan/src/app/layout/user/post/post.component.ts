import { Component, OnInit } from '@angular/core';
import {  FormGroup,FormControl, Validators, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Post } from 'src/app/view_model/post';
import { PostService } from 'src/app/service/post.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ToastService } from 'src/app/service/toast.service';


const URL = 'http://localhost:5000/api/upload';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})


export class PostComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  
  showSuccessOrFailMessage:string="";

  PostForm=new FormGroup({
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
            ImageUrl: new FormControl('',[
              Validators.required
            ]),
            owner_id: new FormControl(''),
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

  
   newPost:Post;
  constructor(private PostService:PostService,
              private router:Router,private ToastService:ToastService) {
  
   }
   
   InsertPost() {
   
   this.PostService.InsertPost(this.PostForm.value)
    .subscribe(
      (data) => {

        this.ToastService.showSuccessToaster("تمت الاضافه بنجاح" ,"حالة الاضافه",2000);

                 var postId=data;
                 var ownerId=localStorage.getItem("currentUserId").split('/')[1];

                 this.PostService.updatePostOfOwnerArray(postId,ownerId).subscribe((data) => {                       
                 
                 this.router.navigate(['/']);
               
                }, (err) => {
                  alert('Error Blocked ..... ');
                });

      },
      (err) => {
        
         this.ToastService.showFailedToaster("فشل الاضافه " ,"حالة الاضافه",2000);
         setTimeout(()=>{
         this.router.navigate(['/post']);
        },3000);

      });
   
  }

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    };

  }

  onSubmit() {
    setTimeout(()=>{
    this.InsertPost();
  },3000);
  }

}

