import { Injectable } from '@angular/core';
import { Student } from '../view_model/student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  student :Student;

  constructor(private HttpClient:HttpClient) { 

    this.student=new Student();
    this.student.email='';
    this.student.fullName='';
    this.student.password='';

  }
  
  getStudentByID(selectedStudentID:string): Observable <Student>
  {  const httpOptions = {headers: new HttpHeaders({
   'Content-Type': 'application/json',
   'Accept': ' */*'
     })
    };
    return(this.HttpClient
    .get <Student>(`http://localhost:5000/getOneStudent/${selectedStudentID}`));
  }




  updateOneStudentWithPassword(selectedStudentID:string , Student:Student):Observable <any>
  {  
     const httpOptions = {headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Accept': ' */*'
     })};
     return (this.HttpClient
       .put<any>(`http://localhost:5000/updateOneStudentWithPassword/${selectedStudentID}`,Student,httpOptions));
  }





  updateOneStudentWithPasswordWithImage(selectedStudentID:string , Student:Student):Observable <any>
  {  
     const httpOptions = {headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Accept': ' */*'
     })};
     return (this.HttpClient
       .put<any>(`http://localhost:5000/updateOneStudentWithPasswordWithImage/${selectedStudentID}`,Student,httpOptions));
  }
 



  updateOneStudentwithImage(selectedStudentID:string , Student:Student):Observable <any>
  {  
     const httpOptions = {headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Accept': ' */*'
     })};
     return (this.HttpClient
       .put<any>(`http://localhost:5000/updateOneStudentwithImage/${selectedStudentID}`,Student,httpOptions));
  }


  updateOneStudent(selectedStudentID:string , Student:Student):Observable <any>
  {  
     const httpOptions = {headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Accept': ' */*'
     })};
     return (this.HttpClient
       .put<any>(`http://localhost:5000/updateOneStudent/${selectedStudentID}`,Student,httpOptions));
  }
 



  registerStudent(student):Observable<any>
  {
   return this.HttpClient.post(`${environment.Api_Url}registerStudent`,student);
  }
  

}
