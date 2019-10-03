import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Owner } from '../../../view_model/owner';
import { OwnerService } from '../../../service/owner.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ToastService } from 'src/app/service/toast.service';
import { FormLoginValidation } from '../../customValidation/custValidation';

const URL = 'http://localhost:5000/api/upload';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.scss']
})
export class EditOwnerComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  
   emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]+[com | net]{3}$';
   phoneRegEx = '^[0]{1}[1]{1}[0-9]{9}$';

  showSuccessOrFailMessage:string="";

  OwnerForm=new FormGroup({
    _id: new FormControl(''),
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(14),
      Validators.pattern(this.emailRegEx)/*,
      FormLoginValidation.cannotContainSpace*/
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(this.phoneRegEx),
      Validators.minLength(11)/*,
      FormLoginValidation.cannotContainSpace*/
    ]),
    status: new FormControl(''),
    imgUrlOwner: new FormControl(''/*, [
      Validators.required
    ]*/)
  });


  get fullName() { return this.OwnerForm.get('fullName'); }
  get email() { return this.OwnerForm.get('email'); }
  get password() { return this.OwnerForm.get('password'); }
  get phone() { return this.OwnerForm.get('phone'); }
  get status() { return this.OwnerForm.get('status'); }
  get imgUrlOwner() { return this.OwnerForm.get('imgUrlOwner'); }


  selectedOwnerID:string;
  selected:Owner;
  passwordcustom:string;
  customOwner:Owner;
  savedImage:string="";

  constructor( private OwnerService:OwnerService,
    private router:Router,private ToastService:ToastService,
    private  ActivatedRoute:ActivatedRoute
  ) { this.selected=new Owner(); 
          this.customOwner=new Owner();  
  }

  ngOnInit() {

    this.selectedOwnerID=this.ActivatedRoute.snapshot.params['id'];
    this.OwnerService.getOwnerByID(this.selectedOwnerID)
    .subscribe((res)=>{
     // console.log(res);
      this.selected=res;
      this.passwordcustom=this.selected.password;
      this.savedImage=this.selected.imgUrlOwner;
  
    },
    (err)=>{ 
      console.log(err);
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         // console.log('ImageUpload:uploaded:', item, status, response);
         // alert('File uploaded successfully');
    };
  }
  
  UpdateOwner(){
    
    this.customOwner._id=this.OwnerForm.value._id;
    this.customOwner.email=this.OwnerForm.value.email;
    this.customOwner.fullName=this.OwnerForm.value.fullName;
    this.customOwner.phone=this.OwnerForm.value.phone;
    this.customOwner.postsOfOwner=this.OwnerForm.value.postsOfOwner;
    this.customOwner.status=this.OwnerForm.value.status;
    this.customOwner.password=this.OwnerForm.value.password;

    if(this.OwnerForm.value.imgUrlOwner=="" && this.passwordcustom==this.OwnerForm.value.password){
        this.customOwner.imgUrlOwner=this.savedImage;
    this.OwnerService.UpdateOwner(this.selectedOwnerID ,this.customOwner)
     .subscribe(
       (data) => {
         console.log("same image and same password");
         this.ToastService.showSuccessToaster("تم التعديل بنجاح","حالة التعديل",2000);
         this.router.navigate(["/viewOwner",this.selectedOwnerID]);
       },
       (err) => { 

        this.router.navigate(["/editOwner",this.selectedOwnerID]);
        this.ToastService.showFailedToaster(" فشل في التعديل ","حالة التعديل",2000);

       }); 
    }
    else if(this.OwnerForm.value.imgUrlOwner=="" && this.passwordcustom!=this.OwnerForm.value.password)
    {  
      this.customOwner.imgUrlOwner=this.savedImage;
      this.OwnerService.UpdateOwnerWithPassword(this.selectedOwnerID ,this.customOwner)
      .subscribe(
        (data) => {
          console.log("same image and changed password");
          this.ToastService.showSuccessToaster("تم التعديل بنجاح","حالة التعديل",2000);
          this.router.navigate(["/viewOwner",this.selectedOwnerID]);
        },
        (err) => { 
         
          this.router.navigate(["/editOwner",this.selectedOwnerID]);
          this.ToastService.showFailedToaster(" فشل في التعديل ","حالة التعديل",2000);

        }); 
    }  
    else if(this.OwnerForm.value.imgUrlOwner!="" && this.passwordcustom==this.OwnerForm.value.password)
    {
      this.customOwner.imgUrlOwner=this.OwnerForm.value.imgUrlOwner;
      
      this.OwnerService.UpdateOwnerWithImage(this.selectedOwnerID ,this.customOwner)
      .subscribe(
        (data) => {
          console.log("changed image and same password");
          this.ngOnInit();
          this.ToastService.showSuccessToaster("تم التعديل بنجاح","حالة التعديل",2000);
          this.router.navigate(["/viewOwner",this.selectedOwnerID]);
        },
        (err) => { 
         
          this.router.navigate(["/editOwner",this.selectedOwnerID]);
          this.ToastService.showFailedToaster(" فشل في التعديل ","حالة التعديل",2000);

        });

    }
    else if(this.OwnerForm.value.imgUrlOwner!="" && this.passwordcustom!=this.OwnerForm.value.password)
    {
      this.customOwner.imgUrlOwner=this.OwnerForm.value.imgUrlOwner;
      
      this.OwnerService.UpdateOwnerWithPasswordWithImage(this.selectedOwnerID ,this.customOwner)
      .subscribe(
        (data) => {
          console.log("change image and change password");
          this.ngOnInit();
          this.ToastService.showSuccessToaster("تم التعديل بنجاح","حالة التعديل",2000);
          this.router.navigate(["/viewOwner",this.selectedOwnerID]);
        },
        (err) => { 
         
          this.router.navigate(["/editOwner",this.selectedOwnerID]);
          this.ToastService.showFailedToaster(" فشل في التعديل ","حالة التعديل",2000);
        });

    }
    else
    {
      console.log("not found");
    }
    
  }
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
  //  console.warn(this.OwnerForm.value);
  setTimeout(()=>{  
  this.UpdateOwner();
  },3000);
  
}

}
