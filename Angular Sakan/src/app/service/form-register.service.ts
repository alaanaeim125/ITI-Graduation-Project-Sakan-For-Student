import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../view_model/student';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Owner } from '../view_model/owner';

@Injectable({
  providedIn: 'root'
})

export class FormRegisterService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  // insert one Student
  InsertOneStudent(student: Student): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return (this.http.post<any>(`${environment.Api_Url}addNewStudent`, student, this.noAuthHeader));
  }


  // insert one Owner
  InsertOneOwner(owner: Owner): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return (this.http.post<any>(`${environment.Api_Url}addNewOwner`, owner, this.noAuthHeader));
  }


}

