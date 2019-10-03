import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormLoginValidation } from '../../customValidation/custValidation';
import { Router } from '@angular/router';
import { AdminPageService } from 'src/app/service/admin-page.service';
import { Admin } from 'src/app/view_model/admin';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})


export class LoginAdminComponent implements OnInit {

  image = '../assets/sakan.jpg';
  emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]+[com | net]{3}$';
  serverErrorMessages:string="";

  formAdmin = new FormGroup({
    emailAdmin: new FormControl('', [
      Validators.required,
      Validators.minLength(14),
      Validators.pattern(this.emailRegEx),
      FormLoginValidation.cannotContainSpace
    ], FormLoginValidation.checkEmailExist),

    passwordAdmin: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ], FormLoginValidation.checkPasswordExist)
    

/*
   emailAdmin: new FormControl(''),
   passwordAdmin: new FormControl('')

  
*/
});


  get emailAdmin() { return this.formAdmin.get('emailAdmin'); }
  get passwordAdmin() { return this.formAdmin.get('passwordAdmin'); }


  checkAdmin() {
    console.log(this.formAdmin.value);
  }

  constructor(private router: Router ,private adminService:AdminPageService) {
    localStorage.setItem('adminProfile',"");
   }

  ngOnInit() {
  }

  loginAdmin()
  {

    this.adminService.loginAdmin({email:this.formAdmin.value.emailAdmin,password:this.formAdmin.value.passwordAdmin}).subscribe(
      res => {
        this.adminService.setToken(res['token']);
      //  console.log("res="+res);
        this.adminService.getAdminIdByEmail(this.formAdmin.value.emailAdmin).subscribe(
        (data)=>{

          var admin=new Admin();
          admin=data;
        //   console.log("data="+data);
          this.adminService.CurrentAdminId=admin._id;
        
          this.router.navigate(['/admin/adminPage']).then(() => {
            window.location.reload();
          });;
       
          localStorage.setItem('adminProfile',admin._id);
  
        },(err)=>{
           console.log(err);
        }
       );
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  



  }


}
