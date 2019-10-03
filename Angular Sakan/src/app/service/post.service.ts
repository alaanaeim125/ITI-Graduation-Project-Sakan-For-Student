import { Injectable } from '@angular/core';
import { Post } from 'src/app/view_model/post';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient:HttpClient) { }


  InsertPost(Post:Post):Observable<any>
   {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': ' */*'
      
        })};
        return (this.httpClient
          .post<any>('http://localhost:5000/addNewPosts',Post,httpOptions));    
   }
   
   getPostByID(selectedPostID:string): Observable <any>
   {  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': ' */*'
      })};
     return(this.httpClient
     .get <any>(`http://localhost:5000/getOnePost/${selectedPostID}`));
   }

   UpdatePost(selectedPostID:string , Post:Post):Observable <any>
   {  
      const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': ' */*'
      })};
      return (this.httpClient
        .put<any>(`http://localhost:5000/updateOnePosts/${selectedPostID}`,Post,httpOptions));
   }


   UpdatePostBySameImage(selectedPostID:string , Post:Post):Observable <any>
   {  
      const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': ' */*'
      })};
      return (this.httpClient
        .put<any>(`http://localhost:5000/updateOnePostsBySameImage/${selectedPostID}`,Post,httpOptions));
   }



   getPostByOwnerID(selectedOwnerID:string): Observable <Post>
   {  const httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': ' */*'
      })};
     return(this.httpClient
     .get <Post>(`http://localhost:5000/getPostByOwnerID/${selectedOwnerID}`));
   }


   updatePostOfOwnerArray(postId,ownerId)
   {
      return (this.httpClient.get<any>(`${environment.Api_Url}storePostIdInOwnerArray/${ownerId}/${postId}`));  
   }


}
