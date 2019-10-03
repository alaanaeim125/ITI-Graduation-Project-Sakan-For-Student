import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { FormLoginValidation } from '../../customValidation/custValidation';
import { FormRegisterService } from 'src/app/service/form-register.service';
import { Student } from 'src/app/view_model/student';
import { Owner } from 'src/app/view_model/owner';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ToastService } from 'src/app/service/toast.service';
import { Router } from '@angular/router';


const URL = 'http://localhost:5000/api/upload';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  image = 'assets/sakan.jpg';
  emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]+[com | net]{3}$';
  //phoneRegEx = '^[01]{2}[0-9]{9}$';
  phoneRegEx = '^[0]{1}[1]{1}[0-9]{9}$';
  //fullNameRegEx='([a-zA-Z\-]+){3,10}\s+([a-zA-Z\-]+){3,10}';
   //fullNameRegEx='^[\u0621-\u064A]+$';
  // pattern="([a-zA-Z\-]+){3,7}\s+([a-zA-Z\-]+){3,10}"

  /*------------------------------ Form Student --------------------------------*/
  formStudent = new FormGroup({

    fullNameStudent: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
     // Validators.pattern(this.fullNameRegEx)
    ]),

    phoneStudent: new FormControl('', [
      Validators.required,
      Validators.pattern(this.phoneRegEx),
      Validators.minLength(11),
      FormLoginValidation.cannotContainSpace
    ]),

    facultyNameStudent: new FormControl(''/*,
      [
        Validators.required,
        Validators.minLength(8)
      ]*/),

    imgUrlStudent: new FormControl('', [
      Validators.required
    ]),

    emailStudent: new FormControl('', [
      Validators.required,
      Validators.minLength(14),
      Validators.pattern(this.emailRegEx),
      FormLoginValidation.cannotContainSpace
    ]),

    passwordStudent: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });


  get fullNameStudent() { return this.formStudent.get('fullNameStudent'); }
  get phoneStudent() { return this.formStudent.get('phoneStudent'); }
  get facultyNameStudent() { return this.formStudent.get('facultyNameStudent'); }
  get imgUrlStudent() { return this.formStudent.get('imgUrlStudent'); }
  get emailStudent() { return this.formStudent.get('emailStudent'); }
  get passwordStudent() { return this.formStudent.get('passwordStudent'); }
  /*------------------------------ Form Student --------------------------------*/

  /*------------------------------ Form Owner --------------------------------*/
  formOwner = new FormGroup({

    fullNameOwner: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),

    phoneOwner: new FormControl('', [
      Validators.required,
      // Validators.pattern(this.phoneRegEx),
      Validators.minLength(11),
      FormLoginValidation.cannotContainSpace
    ]),
    imgUrlOwner: new FormControl('', [
      Validators.required
    ]),

    emailOwner: new FormControl('', [
      Validators.required,
      Validators.minLength(14),
      Validators.pattern(this.emailRegEx),
      FormLoginValidation.cannotContainSpace
    ]),

    passwordOwner: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  get fullNameOwner() { return this.formOwner.get('fullNameOwner'); }
  get phoneOwner() { return this.formOwner.get('phoneOwner'); }
  get imgUrlOwner() { return this.formOwner.get('imgUrlOwner'); }
  get emailOwner() { return this.formOwner.get('emailOwner'); }
  get passwordOwner() { return this.formOwner.get('passwordOwner'); }
  /*------------------------------ Form Owner --------------------------------*/

  constructor(private registerService: FormRegisterService,private toastService:ToastService,
    private Router:Router) { }

  RegisterStudent() {

  //  console.log("name="+this.formStudent.value.fullNameStudent);
    var newStudent=new Student(this.formStudent.value.fullNameStudent,
      this.formStudent.value.passwordStudent,this.formStudent.value.emailStudent,
      this.formStudent.value.phoneStudent,this.formStudent.value.imgUrlStudent,
      this.formStudent.value.facultyNameStudent,true);
    
     
      setTimeout(()=>{
      this.registerService.InsertOneStudent(newStudent).subscribe((data) => {
      
        this.toastShowSuccess("student");
      
        this.Router.navigate(['/loginUser']);

      //  console.log(data);
        
         newStudent={};
      
    }, (err) => {
    //  console.log(err);
      this.toastShowFailed("student");
    });
  },3000);
  }

  


  RegisterOwner() {
  var newOwner=new Owner(this.formOwner.value.fullNameOwner,this.formOwner.value.passwordOwner,
      this.formOwner.value.phoneOwner,this.formOwner.value.emailOwner,
      this.formOwner.value.imgUrlOwner,true);  
    

   setTimeout(()=>{
    this.registerService.InsertOneOwner(newOwner).subscribe((data) => {
     // console.log(data);
      newOwner={};
    
      this.toastShowSuccess("owner");
      
      this.Router.navigate(['/loginUser']);
    
    }, (err) => {
      //console.log(err);
      this.toastShowFailed("owner");
    });
  },3000);


  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        // console.log('ImageUpload:uploaded:', item, status, response);
         //alert('File uploaded successfully');
    };
  }


  toastShowSuccess(valueCheck:string)
 {

   if(valueCheck=="student")
   this.toastService.showSuccessToaster("تمت الإضافه","إضافة طالب",2000);

  if(valueCheck=="owner")
  this.toastService.showSuccessToaster("تمت الإضافه","إضافة صاحب عقار",2000);

 }


 toastShowFailed(valueCheck:string)
 {

   if(valueCheck=="student")
   this.toastService.showFailedToaster("فشل في الإضافه","إضافة طالب",3000);

   if(valueCheck=="owner")
   this.toastService.showFailedToaster("فشل في الإضافة","إضافة صاحب عقار",3000);

 }

}


