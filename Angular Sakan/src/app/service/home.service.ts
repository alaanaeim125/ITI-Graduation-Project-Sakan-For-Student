import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, observable } from 'rxjs';
import { Post } from '../view_model/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  newObj={};

  searchFromHomeObj={};

  constructor(private HttpClient:HttpClient) { 
    
  }

getAllPost():Observable<Post[]>
{
  return this.HttpClient.get<Post[]>(`${environment.Api_Url}getAllPosts`);
}

getAllPostGovernar():Observable<string[]>
{
  return this.HttpClient.get<string[]>(`${environment.Api_Url}getAllPostsGovernar`);
}

getAllPostDistrict():Observable<string[]>
{
  return this.HttpClient.get<string[]>(`${environment.Api_Url}getAllPostsDistrict`);

}

/*
getSearchForPosts( Governar , District , NumberOfRooms , NumberOfBeds , MinPrice , MaxPrice )
:Observable<Post[]>
{
     
     if(Governar=='')
     Governar="null";
     
     if(District=='')
     District="null";
     
     if(NumberOfRooms=='')
     NumberOfRooms=0;
     
     if(NumberOfBeds=='')
     NumberOfBeds=0;

     if(MinPrice=='')
     MinPrice=0;

     if(MaxPrice=='')
     MaxPrice=0;

  
  return this.HttpClient.get<Post[]>(`${environment.Api_Url}requestStudentPost/${Governar}/${District}/${NumberOfRooms}/${NumberOfBeds}/${MinPrice}/${MaxPrice}`);
  
  }
*/
  

getSearchForPostsByPage( Governar , District , NumberOfRooms , NumberOfBeds , MinPrice , MaxPrice ,MinArea,MaxArea, page )
:Observable<Post[]>
{
     
     if(Governar=='')
     Governar="null";
     
     if(District=='')
     District="null";
     
     if(NumberOfRooms=='')
     NumberOfRooms=0;
     
     if(NumberOfBeds=='')
     NumberOfBeds=0;

     if(MinPrice=='')
     MinPrice=0;

     if(MaxPrice=='')
     MaxPrice=0;

     if(MinArea=='')
     MinArea=0;

     if(MaxArea=='')
     MaxArea=0;

  
   return this.HttpClient.get<Post[]>(`${environment.Api_Url}requestStudentPostByPage/${page}/${Governar}/${District}/${NumberOfRooms}/${NumberOfBeds}/${MinPrice}/${MaxPrice}/${MinArea}/${MaxArea}`);
  
  }


  getPostsCount(Governar , District , NumberOfRooms , NumberOfBeds , MinPrice , MaxPrice , MinArea , MaxArea ):Observable<any>
  {
     
    if(Governar=='')
    Governar="null";
    
    if(District=='')
    District="null";
    
    if(NumberOfRooms=='')
    NumberOfRooms=0;
    
    if(NumberOfBeds=='')
    NumberOfBeds=0;

    if(MinPrice=='')
    MinPrice=0;

    if(MaxPrice=='')
    MaxPrice=0;

    if(MinArea=='')
    MinArea=0;

    if(MaxArea=='')
    MaxArea=0;

 
    return this.HttpClient.get<any>(`${environment.Api_Url}getPostsCount/${Governar}/${District}/${NumberOfRooms}/${NumberOfBeds}/${MinPrice}/${MaxPrice}/${MinArea}/${MaxArea}`);
  
  }


  getPostShow(id)
  {
  
    return this.HttpClient.get<any>(`${environment.Api_Url}getOnePost/${id}`);

  }



}
