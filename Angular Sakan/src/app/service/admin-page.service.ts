import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../view_model/admin';

@Injectable({
  providedIn: 'root'
})


export class AdminPageService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  CurrentAdminId:string;

  constructor(private http: HttpClient,) {

    this.CurrentAdminId="";

   }
//////////////////////////////////////////////////

  GetAllStudentActive(): Observable<any> {
    return (this.http.get<any>(`${environment.Api_Url}getStudentsActive`));
  }

  GetAllStudentNotActive() {
    return (this.http.get<any>(`${environment.Api_Url}getStudentsNotActive`));
  }


  GetAllOwnersActive(): Observable<any> {
    return (this.http.get<any>(`${environment.Api_Url}getOwnersActive`));
  }

  GetAllOwnersNotActive(): Observable<any> {
    return (this.http.get<any>(`${environment.Api_Url}getOwnersNotActive`));
  }

  GetAllPostsActive(): Observable<any> {
    return (this.http.get<any>(`${environment.Api_Url}getPostsActive`));
  }

  GetAllPostsNotActive(): Observable<any> {
    return (this.http.get<any>(`${environment.Api_Url}getPostsNotActive`));
  }

  getPostsCountByStatus(status):Observable<any>
  {
    return this.http.get<any>(`${environment.Api_Url}getPostsCountByStatus/${status}`);
  }

  getPostsByStatusAndPage(status,page):Observable<any>
  {
    return this.http.get<any>(`${environment.Api_Url}getPostsByStatusAndPage/${status}/${page}`);
  }

  getStudentsCountByStatus(status):Observable<any>
  {
    return this.http.get<any>(`${environment.Api_Url}getStudentsCountByStatus/${status}`);
  }

  getStudentsByStatusAndPage(status,page):Observable<any>
  {
    return this.http.get<any>(`${environment.Api_Url}getStudentsByStatusAndPage/${status}/${page}`);
  }

  getOwnersCountByStatus(status):Observable<any>
  {
    return this.http.get<any>(`${environment.Api_Url}getOwnersCountByStatus/${status}`);
  }

  getOwnersByStatusAndPage(status,page):Observable<any>
  {
   // console.log("page num service owner = "+page +" and status is "+status);
    return this.http.get<any>(`${environment.Api_Url}getOwnersByStatusAndPage/${status}/${page}`);
  }

  viewStudentById(id) {
    return (this.http.get<any>(`${environment.Api_Url}getOneStudent/${id}`));
  }

  viewOwnerById(id) {
    return (this.http.get<any>(`${environment.Api_Url}getOneOwner/${id}`));
  }

  viewPostById(id) {
    return (this.http.get<any>(`${environment.Api_Url}getOnePost/${id}`));
  }

  blockOneStudent(id) {
    return (this.http.get<any>(`${environment.Api_Url}blockOneStd/${id}`));
  }

  blockOneOwner(id) {
    return (this.http.get<any>(`${environment.Api_Url}blockOneOwn/${id}`));
  }


  blockOnePost(id) {
    return (this.http.get<any>(`${environment.Api_Url}blockOnePost/${id}`));
  }


  activeOneStudent(id) {
    return (this.http.get<any>(`${environment.Api_Url}activeOneStd/${id}`));
  }

  activeOneOwner(id) {
    return (this.http.get<any>(`${environment.Api_Url}activeOneOwner/${id}`));
  }

  activeOnePost(id) {
    return (this.http.get<any>(`${environment.Api_Url}activeOnePost/${id}`));
  }

////////////////////////////////////////////authentication functions//////////////////////////////

loginAdmin(authCredentials:any) {
  console.log("authCredentials="+authCredentials);
  return this.http.post(`${environment.Api_Url}authenticateAdmin`, authCredentials,this.noAuthHeader);
}


setToken(token: string) {
  localStorage.setItem('access-token-admin', token);
  }
  
  getToken() {
  return localStorage.getItem('access-token-admin');
  }
  
  deleteToken() {
  localStorage.removeItem('access-token-admin');
  }
  

  getAdminIdByEmail(email) {
    return this.http.get(`${environment.Api_Url}getAdminIdByEmail/${email}`);
  }


  getAdminPayload() {
  
    var token = this.getToken();
  
   // console.log("wow token="+token);
    
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  
  
  isLoggedIn() {
  
    var userPayload = this.getAdminPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
     }
  
  
  }