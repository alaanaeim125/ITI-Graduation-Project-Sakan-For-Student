import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../view_model/student';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Owner } from '../view_model/owner';


@Injectable({
  providedIn: 'root'
})
export class FormLoginService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  CurrentStudentOrOwnerId:string;
  CurrentStudentOrOwnerType:string;

  constructor(private http: HttpClient) { 
    this.CurrentStudentOrOwnerId="";
    this.CurrentStudentOrOwnerType="";
  }

  ////////////////////////////////////////student authentication//////////////////////////

loginStudent(authCredentials:any) {
  //console.log("authCredentials="+authCredentials);
  return this.http.post(`${environment.Api_Url}authenticateStudent`, authCredentials,this.noAuthHeader);
}


/////////////////////////owner authentication////////////////////////////////


loginOwner(authCredentials)
{
  return this.http.post(`${environment.Api_Url}authenticateOwner`, authCredentials,this.noAuthHeader);
}

setToken(token: string) {
localStorage.setItem('access-token', token);
}

getToken() {
return localStorage.getItem('access-token');
}

deleteToken() {
localStorage.removeItem('access-token');
}

////////////////////////////////////////////////////////////////////////


getStudentIdByEmail(email) {
  return this.http.get(`${environment.Api_Url}getStudentIdByEmail/${email}`);
}

getOwnerIdByEmail(email) {
  return this.http.get(`${environment.Api_Url}getOwnerIdByEmail/${email}`);
}



///////////////////////////////////////////////authorization///////////////////////////

getUserPayload() {
  
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

  var userPayload = this.getUserPayload();
  if (userPayload)
    return userPayload.exp > Date.now() / 1000;
  else
    return false;
   }


}