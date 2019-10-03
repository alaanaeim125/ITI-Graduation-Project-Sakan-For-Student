import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormLoginValidation } from '../../customValidation/custValidation';
import { FormLoginService } from 'src/app/service/form-login.service';
import { Owner } from 'src/app/view_model/owner';
import { Student } from 'src/app/view_model/student';
import { ToastService } from 'src/app/service/toast.service';
import { HomeComponent } from '../../home/home.component';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})


export class LoginUserComponent implements OnInit {

  emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]+[com | net]{3}$';
  serverErrorMessages:string="";

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(14),
      Validators.pattern(this.emailRegEx),
      FormLoginValidation.cannotContainSpace
    ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(8)
      ]),
    type: new FormControl('', Validators.required)
  });

  selectOption = [
    { id: 1, type: 'باحث عن مكان للايجار' },
    { id: 2, type: 'صــاحب مكان' }
  ];

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }


  get type() { return this.form.get('type'); }

  
  constructor(private router: Router ,private FormLoginService:FormLoginService,
    private ToastService:ToastService) { 
    localStorage.setItem('userProfile',"");
  }

  ngOnInit() {
    
    if(localStorage.getItem('userProfile')!="" && localStorage.getItem('currentUserId')!="")
    {
      this.router.navigate([localStorage.getItem('userProfile'),localStorage.getItem('currentUserId')]);
    }
    else
    {
      // console.log("u are not a student or owner");
    }

  }

//student type=1
//owner type=2;

login() { 
  
    var typeOfLogin=this.form.value.type;

if(typeOfLogin==1)
{  
  this.FormLoginService.loginStudent({email:this.form.value.email,password:this.form.value.password}).subscribe(
    (res) => {
      
      if(res==null)
      { 
        this.toastShowMessageBlock("student");
        setTimeout(()=>{
        this.router.navigate(['/loginUser']).then(() => {
        });
      },2000);
      }
    else
    {
      this.FormLoginService.setToken(res['token']);
    
     this.FormLoginService.getStudentIdByEmail(this.form.value.email).subscribe(
      (data)=>{

        var student=new Student();
        student=data;
        
        this.toastShowMessageSuccess("student");

        localStorage.setItem('checkLogin',"true");

        localStorage.setItem('currentUserId', "/"+student._id);

        localStorage.setItem('userProfile', "/viewStudent");

    setTimeout(()=>{
        this.router.navigate(['/']).then(() => {
          window.location.reload();

        });
      },2000);
      
      },(err)=>{
         console.log(err);
         
      }
     );
    }
    },
    (err) => {
      this.toastShowMessageFailed("student");
    }
  );

  }

 else if(typeOfLogin==2)
{  
   this.FormLoginService.loginOwner({email:this.form.value.email,password:this.form.value.password}).subscribe(
    (res) => {

      if(res==null)
      { 
        this.toastShowMessageBlock("owner")
        setTimeout(()=>{
        this.router.navigate(['/loginUser']).then(() => {
        });
      },2000);

      }
      
      else
      {
        

      this.FormLoginService.setToken(res['token']);
    
      this.FormLoginService.getOwnerIdByEmail(this.form.value.email).subscribe(
      (data)=>{

        var owner=new Owner();
         owner =data;
9
         this.toastShowMessageSuccess("owner");
         setTimeout(()=>{
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },2000);

        localStorage.setItem('currentUserId', "/"+owner._id);
        localStorage.setItem('userProfile', "/viewOwner");

      },(err)=>{
         console.log(err);
      }
     );
    }
    },
    (err) => {
      this.toastShowMessageFailed("owner");
    }
  );
  
  
  }


}



goToSignUp()
{
  this.router.navigate(['/registerUser']);
}



toastShowMessageSuccess(valueCheck:string)
{

 if(valueCheck=="student")
 this.ToastService.showSuccessToaster("تم الدخول بنجاح"," تسجيل دخول طالب",2000);

 if(valueCheck=="owner")
 this.ToastService.showSuccessToaster("تم الدخول بنجاح","تسجيل دخول صاحب عقار",2000);

}


toastShowMessageFailed(valueCheck:string)
{

 if(valueCheck=="student")
 this.ToastService.showFailedToaster("افحص الإيميل او كلمة السر الخاصه بك","فشل تسجيل دخول طالب",2000);

 if(valueCheck=="owner")
 this.ToastService.showFailedToaster("افحص الإيميل او كلمة السر الخاصه بك","فشل تسجيل دخول صاحب عقار",2000);

}


toastShowMessageBlock(valueCheck:string)
{

 if(valueCheck=="student")
 this.ToastService.showFailedToaster("تم حظرك من قبل الأدمن نأسف لتعرضك لتلك التجربه","حظر طالب",2000);

 if(valueCheck=="owner")
 this.ToastService.showFailedToaster("تم حظرك من قبل الأدمن نأسف لتعرضك لتلك التجربه","حظر صاحب عقار",2000);

}




}