import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  HttpClient,HttpHeaders } from '@angular/common/http';
import { Owner } from 'src/app/view_model/owner';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private httpClient:HttpClient) { }
  
  getOwnerByID(selectedOwnerID:string): Observable <Owner>
  {  const httpOptions = {headers: new HttpHeaders({
   'Content-Type': 'application/json',
   'Accept': ' */*'
     })
    };
    return(this.httpClient
    .get <Owner>(`http://localhost:5000/getOneOwner/${selectedOwnerID}`));
  }


  getOwnerByPostID(selectedPostID:string): Observable <Owner>
  {  const httpOptions = {headers: new HttpHeaders({
   'Content-Type': 'application/json',
   'Accept': ' */*'
     })
    };
    return(this.httpClient
    .get <Owner>(`http://localhost:5000/getOwnerByPostID/${selectedPostID}`));
  }

 
  

  deletePostFromPosts(postID):Observable <any>
  {
     return this.httpClient.delete<any>(`${environment.Api_Url}deleteOnePosts/${postID}`);
  }

  deletePostFromOwnerPostArray(ownerID,postID)
  {
    return this.httpClient.get<any>(`${environment.Api_Url}deletePostFromOwnerPostArray/${ownerID}/${postID}`);
  }




  UpdateOwner(selectedOwnerID:string , Owner:Owner):Observable <any>
  {  
     const httpOptions = {headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Accept': ' */*'
     })};
     return (this.httpClient
       .put<any>(`http://localhost:5000/updateOneOwners/${selectedOwnerID}`,Owner,httpOptions));
  }

  UpdateOwnerWithImage(selectedOwnerID:string , Owner:Owner):Observable <any>
  {  
     const httpOptions = {headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Accept': ' */*'
     })};
     return (this.httpClient
       .put<any>(`http://localhost:5000/updateOneOwnersWithImage/${selectedOwnerID}`,Owner,httpOptions));
  }
  



  UpdateOwnerWithPassword(selectedOwnerID:string , Owner:Owner):Observable <any>
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': ' */*'
      })};
      return (this.httpClient
        .put<any>(`http://localhost:5000/updateOneOwnersWithPassword/${selectedOwnerID}`,Owner,httpOptions));
  }


  UpdateOwnerWithPasswordWithImage(selectedOwnerID:string , Owner:Owner):Observable <any>
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': ' */*'
      })};
      return (this.httpClient
        .put<any>(`http://localhost:5000/updateOneOwnersWithPasswordWithImage/${selectedOwnerID}`,Owner,httpOptions));
  }


  
  


}


