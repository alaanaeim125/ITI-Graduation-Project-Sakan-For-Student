import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private HttpClient: HttpClient) { }

  sendEmail(emailDetails)
  {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.HttpClient.post(`${environment.Api_Url}sendEmailToAdmin`,emailDetails,httpOption );
  }
}
