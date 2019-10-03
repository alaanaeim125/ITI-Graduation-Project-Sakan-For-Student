import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/view_model/post';
import { HomeService } from 'src/app/service/home.service';
import { ToastService } from 'src/app/service/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  private page:number=0;

  private searchPostList:Array<Post>=[];

  private pages:number=0;

  private pagesCount:Array<number>=[];

  private perPage:number=6;

  governar :string='';
  district:string='';
  numberOfRooms:number=0;
  numberOfBeds:number=0;
  minPrice:number=0;
  maxPrice:number=0;

  isThereAPost:boolean=false;

  constructor(private router: Router,private HomeService:HomeService ,private ToastService:ToastService) { 
  
  }

  setPage(i,event:any)
  {
    event.preventDefault();
    this.page=i;
    this.getPosts();
  }


  ngOnInit() {
    
    this.getPages(); 
    this.getPosts();
   
  }


getPosts()
{

  this.HomeService.getSearchForPostsByPage(localStorage.getItem("token1"),localStorage.getItem("token2")
  ,localStorage.getItem("token3"),localStorage.getItem("token4"),localStorage.getItem("token5"),
  localStorage.getItem("token6"),localStorage.getItem("token7"),localStorage.getItem("token8") ,this.page).subscribe((res)=>{ 
      this.searchPostList=res;
      for(let i=0;i<this.searchPostList.length;i++)
      {
            this.searchPostList[i].ImageUrl=environment.Api_Url+this.searchPostList[i].ImageUrl;
      }
      
      if(this.searchPostList.length>0)
       this.isThereAPost=true;
       else
       this.isThereAPost=false;
      
   },(err)=>{
     console.log("error is "+err);
   })




}  


getPages()
{ 
  this.pagesCount=[];
  this.HomeService.getPostsCount(localStorage.getItem("token1"),localStorage.getItem("token2")
  ,localStorage.getItem("token3"),localStorage.getItem("token4"),localStorage.getItem("token5"),
  localStorage.getItem("token6"),localStorage.getItem("token7"),localStorage.getItem("token8")).subscribe((res)=>{ 
    //console.log("count is ="+res);
    this.pages=Math.ceil(parseInt(res)/6);
   // console.log(this.pages);
    for(let j=0;j<this.pages;j++){
        this.pagesCount.push(j);
     //   console.log(j);
    }
  },(err)=>{
    console.log("error is "+err);
  })
}


showPost(stringID)
{
 
  if(localStorage.getItem('adminProfile')=="" && localStorage.getItem('currentUserId')=="" &&   localStorage.getItem('userProfile')=="")
{
  this.ToastService.showSuccessToaster("الذهاب للتسجيل","التسجيل أولاً",2000);
}


if( localStorage.getItem('currentUserId')!="" &&   localStorage.getItem('userProfile')!="" )
{  
  this.router.navigate(['/showPost',stringID]);
}


if( localStorage.getItem('adminProfile')!="" )
{
 this.router.navigate(['/admin/viewPostAdminFromSearch',stringID]);
}

setTimeout(()=>{

if(localStorage.getItem('adminProfile')=="" && localStorage.getItem('currentUserId')=="" &&   localStorage.getItem('userProfile')=="")
{
  this.router.navigate(['/loginUser']);
}

},2000);

}



}
