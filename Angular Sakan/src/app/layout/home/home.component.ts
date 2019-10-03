import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HomeService } from 'src/app/service/home.service';
import { Post } from 'src/app/view_model/post';
import { Router} from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';


HomeService
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  governar = new FormControl('');
  district = new FormControl('');
  numberOfRooms = new FormControl('');
  minPrice = new FormControl('');
  maxPrice = new FormControl('');
  minArea = new FormControl('');
  maxArea = new FormControl('');
  numberOfBeds = new FormControl('');
  avaliableNumberOfBeds = new FormControl('');


  listCity= ["cairo","assiut","minia","sohag"];
  listGovernar:string[]=[];
  listDistrict:string[]=[];
  postList:Post[]=[];
  selectRandomPost:Post[]=[];
  randomIndexArray:number[]=[];
  post1:Post;post2:Post;post3:Post;post4:Post;post5:Post;post6:Post;post7:Post;post8:Post;post9:Post;
  currentDate:Date;
  currentDay:number;

  p1FromDay:number; p2FromDay:number; p3FromDay:number; p4FromDay:number; p5FromDay:number;
  p6FromDay:number; p7FromDay:number; p8FromDay:number; p9FromDay:number;

  distinctFlats:boolean=true;
  
  point1Check:boolean;
  point2Check:boolean;
  point3Check:boolean;

  constructor(private HomeService:HomeService,private Router:Router,private ToastService:ToastService) {

    this.currentDate=new Date();

    this.post1=new Post();
    this.post2=new Post();
    this.post3=new Post();
    this.post4=new Post();
    this.post5=new Post();
    this.post6=new Post();
    this.post7=new Post();
    this.post8=new Post();
    this.post9=new Post();

  
   }


  ngOnInit() {

    this.HomeService.getAllPost().subscribe((res)=>{

      for(let i=0;i<res.length;i++)
      {
        this.postList.push(

          new Post(res[i]._id,res[i].Date,res[i].Governar,res[i].District,res[i].Area,
          res[i].NumberOfRooms,res[i].Price,res[i].Street,res[i].NumberOfBeds,
          res[i].Available_NumberOfBeds,res[i].ImageUrl,res[i].Details,res[i].status)
        );
     
      }

     var counter=0;
     
     if(this.postList.length>=9)
     {
      while(counter<9)
      {
        var randomIndex=Math.floor(Math.random() * this.postList.length);
        
        if( ! this.randomIndexArray.includes(randomIndex))
        {
        this.selectRandomPost[counter] = this.postList[randomIndex];
        this.randomIndexArray.push(randomIndex);
        
        counter++;
        }

      }
  
      this.point1Check=true;
      this.point2Check=true;
      this.point3Check=true;
 
     this.post1=this.selectRandomPost[0];
     this.post2=this.selectRandomPost[1];
     this.post3=this.selectRandomPost[2];
     this.post4=this.selectRandomPost[3];
     this.post5=this.selectRandomPost[4];
     this.post6=this.selectRandomPost[5];
     this.post7=this.selectRandomPost[6];
     this.post8=this.selectRandomPost[7];
     this.post9=this.selectRandomPost[8];
  
     
     this.post1.ImageUrl="http://localhost:5000/"+this.selectRandomPost[0].ImageUrl;
     this.post2.ImageUrl="http://localhost:5000/"+this.selectRandomPost[1].ImageUrl;
     this.post3.ImageUrl="http://localhost:5000/"+this.selectRandomPost[2].ImageUrl;
     this.post4.ImageUrl="http://localhost:5000/"+this.selectRandomPost[3].ImageUrl;
     this.post5.ImageUrl="http://localhost:5000/"+this.selectRandomPost[4].ImageUrl;
     this.post6.ImageUrl="http://localhost:5000/"+this.selectRandomPost[5].ImageUrl;
     this.post7.ImageUrl="http://localhost:5000/"+this.selectRandomPost[6].ImageUrl;
     this.post8.ImageUrl="http://localhost:5000/"+this.selectRandomPost[7].ImageUrl;
     this.post9.ImageUrl="http://localhost:5000/"+this.selectRandomPost[8].ImageUrl;


    
      var dateNow= this.currentDate.toISOString().substr(0,10);
    
      this.p1FromDay= this.calculateFromDate(dateNow,this.post1.Date.toString().substr(0,10));
      this.p2FromDay= this.calculateFromDate(dateNow,this.post2.Date.toString().substr(0,10));
      this.p3FromDay= this.calculateFromDate(dateNow,this.post3.Date.toString().substr(0,10));
      this.p4FromDay= this.calculateFromDate(dateNow,this.post4.Date.toString().substr(0,10));
      this.p5FromDay= this.calculateFromDate(dateNow,this.post5.Date.toString().substr(0,10));
      this.p6FromDay= this.calculateFromDate(dateNow,this.post6.Date.toString().substr(0,10));
      this.p7FromDay= this.calculateFromDate(dateNow,this.post7.Date.toString().substr(0,10));
      this.p8FromDay= this.calculateFromDate(dateNow,this.post8.Date.toString().substr(0,10));
      this.p9FromDay= this.calculateFromDate(dateNow,this.post9.Date.toString().substr(0,10));

      this.distinctFlats=true;
      // console.log("from if");
    }
    else
    {
    
    this.distinctFlats=false;
    
    var len=this.postList.length; 
    var dateNow= this.currentDate.toISOString().substr(0,10);
    // console.log("from else");
     if(len>0)
     { 
      this.post1.status=true;
      this.post1=this.postList[0];
      this.post1.ImageUrl="http://localhost:5000/"+this.postList[0].ImageUrl;
      this.p1FromDay= this.calculateFromDate(dateNow,this.post1.Date.toString().substr(0,10));
      this.distinctFlats=true;
     }
     else
     {
      this.post1.status=false;
     }


     if(len>1)
     {
      this.point1Check=true;
      this.post2.status=true;
      this.post2=this.postList[1];
      this.post2.ImageUrl="http://localhost:5000/"+this.postList[1].ImageUrl;
      this.p2FromDay= this.calculateFromDate(dateNow,this.post2.Date.toString().substr(0,10));
      //this.distinctFlats=true;
     }
     else
     {
      this.post2.status=false;
      this.point1Check=false;

     }

     
     
     if(len>2)
     {
      this.post3.status=true;
      this.post3=this.postList[2];
      this.post3.ImageUrl="http://localhost:5000/"+this.postList[2].ImageUrl;
      this.p3FromDay= this.calculateFromDate(dateNow,this.post3.Date.toString().substr(0,10));
      //this.distinctFlats=true;
     }
     else
     {
      this.post3.status=false;
     }
    

     
     if(len>3)
     {
      this.point2Check=true;
      this.post4.status=true;
      this.post4=this.postList[3];
      this.post4.ImageUrl="http://localhost:5000/"+this.postList[3].ImageUrl;
      this.p4FromDay= this.calculateFromDate(dateNow,this.post4.Date.toString().substr(0,10));
      //this.distinctFlats=true;
     }
     else
     {
      this.post4.status=false;
      this.point3Check=false;
     }



    
    if(len>4)
    {
     this.post5.status=true;
     this.post5=this.postList[4];
     this.post5.ImageUrl="http://localhost:5000/"+this.postList[4].ImageUrl;
     this.p5FromDay= this.calculateFromDate(dateNow,this.post5.Date.toString().substr(0,10));
     //this.distinctFlats=true;
    }
    else
    {
     this.post5.status=false;
    }


    
    if(len>5)
    {
     
     this.post6.status=true;
     this.post6=this.postList[5];
     this.post6.ImageUrl="http://localhost:5000/"+this.postList[5].ImageUrl;
     this.p6FromDay= this.calculateFromDate(dateNow,this.post6.Date.toString().substr(0,10));
     //this.distinctFlats=true;
    }
    else
    {
     this.post6.status=false;

    }


    if(len>6)
    {
     this.point3Check=true;
     this.post7.status=true;
     this.post7=this.postList[6];
     this.post7.ImageUrl="http://localhost:5000/"+this.postList[6].ImageUrl;
     this.p7FromDay= this.calculateFromDate(dateNow,this.post7.Date.toString().substr(0,10));
     //this.distinctFlats=true;
    }
    else
    {
     this.post7.status=false;
     this.point3Check=false;

    }

    if(len>7)
    {
     this.post8.status=true;
     this.post8=this.postList[7];
     this.post8.ImageUrl="http://localhost:5000/"+this.postList[7].ImageUrl;
     this.p8FromDay= this.calculateFromDate(dateNow,this.post8.Date.toString().substr(0,10));
     //this.distinctFlats=true;

    }
    else
    {
     this.post8.status=false;
    }

  }

    },(err)=>{
      console.log("error is "+err);
    })







    this.HomeService.getAllPostGovernar().subscribe((res)=>{
     for(let gov of res) 
      this.listGovernar.push(gov);
     
    },(err)=>{
      console.log("error is "+err);
    })




    this.HomeService.getAllPostDistrict().subscribe((res)=>{
      for(let dis of res) 
       this.listDistrict.push(dis);
      
     },(err)=>{
       console.log("error is "+err);
     })


    


  }




  calculateFromDate(dateDayNow :string , dateOfPost:string) :number
  {
    const dateNow = new Date(dateDayNow);
    const datePost = new Date(dateOfPost);
    const diffTimePost1 = Math.abs(datePost.getTime() - dateNow.getTime());
    var days = Math.ceil(diffTimePost1 / (1000 * 60 * 60 * 24));
    return days;
  }



  goToSearch()
  {
   
    var searchObj={};



this.HomeService.searchFromHomeObj["governar"]=this.governar.value;
this.HomeService.searchFromHomeObj["district"]=this.district.value;
this.HomeService.searchFromHomeObj["numberOfRooms"]=this.numberOfRooms.value;
this.HomeService.searchFromHomeObj["numberOfBeds"]=this.numberOfBeds.value;
this.HomeService.searchFromHomeObj["minPrice"]=this.minPrice.value;
this.HomeService.searchFromHomeObj["maxPrice"]=this.maxPrice.value;
this.HomeService.searchFromHomeObj["minArea"]=this.minArea.value;
this.HomeService.searchFromHomeObj["maxArea"]=this.maxArea.value;


var governor=this.governar.value;;
localStorage.setItem("token1", governor);

var district=this.district.value;;
localStorage.setItem("token2", district);

var numberOfRooms=this.numberOfRooms.value;;
localStorage.setItem("token3", numberOfRooms);

var numberOfBeds=this.numberOfBeds.value;;
localStorage.setItem("token4", numberOfBeds);

var minPrice=this.minPrice.value;;
localStorage.setItem("token5", minPrice);

var maxPrice=this.maxPrice.value;;
localStorage.setItem("token6", maxPrice)

var minArea=this.minArea.value;;
localStorage.setItem("token7", minArea);

var maxArea=this.maxArea.value;;
localStorage.setItem("token8", maxArea)



this.Router.navigate(['/search'], { state: { result: {"Governar":this.governar.value  , 
"District":this.district.value ,"numberOfRooms":this.numberOfRooms.value ,
"numberOfBeds":this.numberOfBeds.value ,"minPrice":this.minPrice.value ,
"maxPrice":this.maxPrice.value} } });



  }



showPost(stringID)
{
   
if( localStorage.getItem('currentUserId')!="" &&   localStorage.getItem('userProfile')!="" )
{  
this.Router.navigate(['/showPost',stringID]);
}

if( localStorage.getItem('adminProfile')!="" )
{
  this.Router.navigate(['/admin/viewPostAdminFromSearch',stringID]);
}

if(localStorage.getItem('currentUserId')=="" &&   localStorage.getItem('userProfile')=="" && localStorage.getItem('adminProfile')=="")
{
  this.ToastService.showSuccessToaster("الذهاب للتسجيل","التسجيل أولاً",2000);
  setTimeout(()=>{
     this.Router.navigate(['/loginUser']);
  },2000);
}

}



}
