import { Component, OnInit } from '@angular/core';
import { AdminPageService } from 'src/app/service/admin-page.service';
import { Student } from 'src/app/view_model/student';
import { Owner } from 'src/app/view_model/owner';
import { Post } from 'src/app/view_model/post';
import { Router } from '@angular/router';
import { Window } from 'selenium-webdriver';
import { ToastService } from 'src/app/service/toast.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})


export class AdminPageComponent implements OnInit {

  studentsActive: Student[];
  ownersActive: Owner[];
  postsActive: Post[];

  studentsNotActive: Student[];
  ownersNotActive: Owner[];
  postsNotActive: Post[];


  
  countActiveStudent = 0;
  countNotActiveStudent = 0;

  countActiveOwner = 0;
  countNotActiveOwner = 0;

  countActivePosts = 0;
  countNotActivePosts = 0;


  private pagePost:number=0;
  private pageStudent:number=0;
  private pageOwner:number=0;
  private pages:number=0;
  private pagesCount:Array<number>=[];
  
  private perPage:number=6;

  private pagesCountActiveStudent:Array<number>=[];
  private pagesCountNotActiveStudent:Array<number>=[];
  private pagesCountActivePost:Array<number>=[];
  private pagesCountNotActivePost:Array<number>=[];
  private pagesCountActiveOwner:Array<number>=[];
  private pagesCountNotActiveOwner:Array<number>=[];

  constructor(private adminServ: AdminPageService,private Router:Router,private toastService:ToastService) {


   }


  setPagePost(i,event:any,status)
  {
    event.preventDefault();
    this.pagePost=i;
    //console.log('i='+i);
    //console.log("this.page="+this.page);
    this.getPostsByStatusAndPage(status,i);
  }

  setPageStudent(i,event:any,status)
  {
    event.preventDefault();
    this.pageStudent=i;
    //console.log('i='+i);
    //console.log("this.page="+this.page);
    this.getStudentsByStatusAndPage(status,i);
  }


  setPageOwner(i,event:any,status)
  {
    event.preventDefault();
    this.pageOwner=i;
    //console.log('i='+i);
    this.getOwnersByStatusAndPage(status,i);
  }

  ngOnInit() {

    this.getStudentsByStatusAndPage(true,0);
    this.getStudentsByStatusAndPage(false,0);

    this.getPostsByStatusAndPage(true,0);
    this.getPostsByStatusAndPage(false,0);

    this.getOwnersByStatusAndPage(true,0);
    this.getOwnersByStatusAndPage(false,0);
 


  }


  viewStudent(id) {
    this.Router.navigate(['admin/viewStudentAdmin', id]);
  }


  viewOwner(id) {
    this.Router.navigate(['admin/viewOwnerAdmin', id]);
  }

  viewPost(id) {
    this.Router.navigate(['admin/viewPostAdmin', id]);
  }

  showToast() {
    this.toastService.showSuccessToaster("new admin","add admin",2000);

  }


  blockStudent(id) {
    this.adminServ.blockOneStudent(id).subscribe((data) => {
      this.ngOnInit();
      //this.getStudentsByStatusAndPage(true,0);
     // window.location.reload();
    }, (err) => {
      alert('Error Blocked ..... ');
    });
  }

  blockOwner(id) {
    this.adminServ.blockOneOwner(id).subscribe((data) => {
      this.ngOnInit();
      //window.location.reload();
      //this.getOwnersByStatusAndPage(true,0);
    }, (err) => {
      alert('Error Blocked ..... ');
    });
  }


  blockPost(id) {
    this.adminServ.blockOnePost(id).subscribe((data) => {
      //this.getPostsCount(true);
      this.ngOnInit();
    }, (err) => {
      alert('Error Blocked ..... ');
    });
  }


  activeStudent(id) {
    this.adminServ.activeOneStudent(id).subscribe((data) => {
      //this.studentsNotActive=data;
      //this.getStudentsCount(false);
      this.ngOnInit();
      //window.location.reload();
    }, (err) => {
      alert('Error Blocked ..... ');
    });
  }


  activeOwner(id) {
    this.adminServ.activeOneOwner(id).subscribe((data) => {
      //this.getOwnersCount(false);
       this.ngOnInit();
    }, (err) => {
      alert('Error Blocked ..... ');
    });
  }

  activePost(id) {
    this.adminServ.activeOnePost(id).subscribe((data) => {
      //this.getPostsCount(false);

      this.ngOnInit();
    }, (err) => {
      alert('Error Blocked ..... ');
    });
  }



  getPostsByStatusAndPage(status,page)
  { 
    this.getPostsCount(status);

    this.adminServ.getPostsByStatusAndPage(status,page).subscribe((res)=>{ 
     if(status==true)
     {
     this.postsActive=res;
     
     }
     else
     {
     this.postsNotActive=res;
     }
    },(err)=>{
       console.log("error is "+err);
     })
  
  
  }

  getPostsCount(status)
{ 
  this.pagesCountActivePost=[];
  this.pagesCountNotActivePost=[];
  this.pages=0;
  this.adminServ.getPostsCountByStatus(status).subscribe((res)=>{ 
    //console.log("count is ="+res);
    this.pages=Math.ceil(parseInt(res)/6);
    if(status==true)
  {
    this.countActivePosts=res;
    
  }
  else
  {
    this.countNotActivePosts=res;
  }
    for(let j=0;j<this.pages;j++){
      if(status==true)
        this.pagesCountActivePost.push(j);
      else
        this.pagesCountNotActivePost.push(j);

      //  console.log("post (j)="+j);
    }
  },(err)=>{
    console.log("error is "+err);
  })
}



getStudentsByStatusAndPage(status,page)
{ 
  //console.log("student page number="+page);
  this.getStudentsCount(status);

  this.adminServ.getStudentsByStatusAndPage(status,page).subscribe((res)=>{ 
   if(status==true)
   this.studentsActive=res;
   else
   this.studentsNotActive=res;
  },(err)=>{
     console.log("error is "+err);
   })


}

getStudentsCount(status)
{ 
this.pagesCountActiveStudent=[];
this.pagesCountNotActiveStudent=[];
this.pages=0;
this.adminServ.getStudentsCountByStatus(status).subscribe((res)=>{ 
  //console.log("count is ="+res);
  this.pages=Math.ceil(parseInt(res)/6);
  if(status==true)
  {
    this.countActiveStudent=res;
  }
  else
  {
    this.countNotActiveStudent=res;
  }
  for(let j=0;j<this.pages;j++){
    if(status==true)
      this.pagesCountActiveStudent.push(j);
    else
      this.pagesCountNotActiveStudent.push(j);

      //console.log("student (j)="+j);
  }
},(err)=>{
  console.log("error is "+err);
})
}




getOwnersByStatusAndPage(status,page)
{ 
  //console.log("owner page number="+page);
  this.getOwnersCount(status)
  this.adminServ.getOwnersByStatusAndPage(status,page).subscribe((res)=>{ 
   if(status==true)
   {
   this.ownersActive=res;
   
  }
   else
   {
   this.ownersNotActive=res;
   //console.log("count="+this.pagesCount); 
   this.pagesCount=[];
  }
  },(err)=>{
     console.log("error is "+err);
   })


}

getOwnersCount(status)
{ 
  
this.pagesCountActiveOwner=[];
this.pagesCountNotActiveOwner=[];
this.pages=0;
this.adminServ.getOwnersCountByStatus(status).subscribe((res)=>{ 
  //console.log("count is ="+res);
  this.pages=Math.ceil(parseInt(res)/6);
  if(status==true)
  {
    this.countActiveOwner=res;
  }
  else
  {
    this.countNotActiveOwner=res;
  }

  for(let j=0;j<this.pages;j++){
    if(status==true)
      this.pagesCountActiveOwner.push(j);
    else
      this.pagesCountNotActiveOwner.push(j);
    //  console.log("owner (j)="+j);
  }
},(err)=>{
  console.log("error is "+err);
})
}




}
