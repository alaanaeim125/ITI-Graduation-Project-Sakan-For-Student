import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/service/email.service';
import { ToastService } from 'src/app/service/toast.service';
import { Router } from '@angular/router';
Router

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  loadading:boolean=false;
  sendButton:string="";

  fullName:string="";
  email:string="";
  password:string="";
  emailBody:string="";
  emailSubject:string="";
  checked:boolean;

  emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]+[com | net]{3}$';

  constructor(private EmailService:EmailService,private ToastService:ToastService,private Router:Router) {

   }

  ngOnInit() {
  }

  sentEmailToAdmin(sendEmailForm)
  {
    if(localStorage.getItem('adminProfile')!="" || localStorage.getItem('currentUserId')!="" &&   localStorage.getItem('userProfile')!="")
    {
    console.log(sendEmailForm.value);
        
  let userEmail={
  fullName:this.fullName,
  email:this.email,
  password:this.password,
  subject:this.emailSubject,
  body:this.emailBody
  
};


this.EmailService.sendEmail(userEmail).subscribe(
(res)=>{
   this.ToastService.showSuccessToaster("تم الارسال بنجاح للمسئول","حالة الرساله",3000);
   console.log("res="+res);
},
(err)=>{
  this.ToastService.showFailedToaster("فشل الارسال برجاء المحاوله مره اخري","حالة الرساله",3000);
  console.log("err="+err);
}
);

    }
    else
    {
      this.Router.navigate(['/loginUser']);
      this.ToastService.showFailedToaster("must login","satus login",2000);
    }

  }

 /*


 if(localStorage.getItem('adminProfile')!="" && localStorage.getItem('currentUserId')!="" &&   localStorage.getItem('userProfile')!="")
{
  this.ToastService.showSuccessToaster("الذهاب للتسجيل","التسجيل أولاً",2000);
}


if( localStorage.getItem('currentUserId')!="" &&   localStorage.getItem('userProfile')!="" )
{  
  this.router.navigate(['/showPost',stringID]);
}


if( localStorage.getItem('adminProfile')!="" )
{
 this.router.navigate(['/admin/viewPostAdminFromSearch',stringID]);
}

setTimeout(()=>{

if(localStorage.getItem('adminProfile')=="" && localStorage.getItem('currentUserId')=="" &&   localStorage.getItem('userProfile')=="")
{
  this.router.navigate(['/loginUser']);
}

},2000);

}




 */

}
