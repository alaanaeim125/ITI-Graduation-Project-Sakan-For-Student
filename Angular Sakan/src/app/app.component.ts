import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  title = 'project Angular';
 
  currentProfile:string="";
  currentStatus:boolean=false;
  
  currentAdminId:string;
  currentStatusAdmin:boolean=false;

  userIsOwner:boolean=false;

  constructor()
  {

  this.currentProfile=localStorage.getItem('userProfile')+localStorage.getItem("currentUserId");
  
  if(this.currentProfile!="")
     this.currentStatus=true;

  if(localStorage.getItem('userProfile')=="/viewOwner")
     this.userIsOwner=true;
 
  this.currentAdminId=localStorage.getItem('adminProfile');
  
  if(this.currentAdminId!="")
     this.currentStatusAdmin=true;


  }

  ngOnInit()
  {
   
  }

  ngAfterView

}
