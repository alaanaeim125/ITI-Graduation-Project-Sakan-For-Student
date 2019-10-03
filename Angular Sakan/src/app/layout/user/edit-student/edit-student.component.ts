import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../../view_model/student';
import { StudentService } from '../../../service/student.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { FormLoginValidation } from '../../customValidation/custValidation';


const URL = 'http://localhost:5000/api/upload';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})


export class EditStudentComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  showSuccessOrFailMessage: string = '';

  emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]+[com | net]{3}$';
  phoneRegEx = '^[0]{1}[1]{1}[0-9]{9}$';

  StudentForm = new FormGroup({
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
    facultyName: new FormControl('',
      [
        Validators.required
      ]),
       imgUrlStudent: new FormControl(''/*, [
      Validators.required
    ]*/)
  });


  get fullName() { return this.StudentForm.get('fullName'); }
  get email() { return this.StudentForm.get('email'); }
  get password() { return this.StudentForm.get('password'); }
  get phone() { return this.StudentForm.get('phone'); }
  get status() { return this.StudentForm.get('status'); }
  get facultyName() { return this.StudentForm.get('facultyName'); }
  get imgUrlStudent() { return this.StudentForm.get('imgUrlStudent'); }


  passwordcustom: string;
  selectedStudentID: string;
  selected: Student;
  customStudent: Student;
  savedImgUrl: string = "";

  constructor(private StudentService: StudentService,
    private router: Router, private ActivatedRoute: ActivatedRoute) {
    this.selected = new Student();
    this.customStudent = new Student();

  }

  ngOnInit() {

    this.selectedStudentID = this.ActivatedRoute.snapshot.params['id'];
    this.StudentService.getStudentByID(this.selectedStudentID)
      .subscribe((res) => {

        this.selected = res;
        this.passwordcustom = this.selected.password;
        this.savedImgUrl = this.selected.imgUrlStudent;
      },
        (err) => {
          console.log(err);
        });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

    };

  }

  UpdateStudent() {

    this.customStudent._id = this.StudentForm.value._id;
    this.customStudent.email = this.StudentForm.value.email;
    this.customStudent.facultyName = this.StudentForm.value.facultyName;
    this.customStudent.fullName = this.StudentForm.value.fullName;
    this.customStudent.phone = this.StudentForm.value.phone;
    this.customStudent.status = this.StudentForm.value.status;


    if (this.StudentForm.value.imgUrlStudent == "" && this.passwordcustom == this.StudentForm.value.password) {

      this.customStudent.password = this.passwordcustom;
      this.customStudent.imgUrlStudent = this.savedImgUrl;

      this.StudentService.updateOneStudent(this.selectedStudentID, this.customStudent)
        .subscribe(
          (data) => {
            console.log("same image and same pass");
            this.router.navigate(["/viewStudent/", this.selectedStudentID]);
          },
          (err) => {

            this.router.navigate(["/editStudent/", this.selectedStudentID]);

          });
    }
    else if (this.StudentForm.value.imgUrlStudent != "" && this.passwordcustom == this.StudentForm.value.password) {

      this.customStudent.password = this.passwordcustom;
      this.customStudent.imgUrlStudent = this.StudentForm.value.imgUrlStudent;

      this.StudentService.updateOneStudentwithImage(this.selectedStudentID, this.customStudent)
        .subscribe(
          (data) => {
            console.log("changed image and same password");
            this.router.navigate(["/viewStudent/", this.selectedStudentID]);
          },
          (err) => {

            this.router.navigate(["/editStudent/", this.selectedStudentID]);

          });

    }
    else if (this.StudentForm.value.imgUrlStudent == "" && this.passwordcustom != this.StudentForm.value.password) {
      this.customStudent.password = this.StudentForm.value.password;
      this.customStudent.imgUrlStudent = this.savedImgUrl;

      this.StudentService.updateOneStudentWithPassword(this.selectedStudentID, this.customStudent)
        .subscribe(
          (data) => {
            console.log("same image and changed password");
            this.router.navigate(["/viewStudent/", this.selectedStudentID]);
          },
          (err) => {

            this.router.navigate(["/editStudent/", this.selectedStudentID]);

          });

    }

    else if (this.StudentForm.value.imgUrlStudent != "" && this.passwordcustom != this.StudentForm.value.password) {

      this.customStudent.password = this.StudentForm.value.password;
      this.customStudent.imgUrlStudent = this.StudentForm.value.imgUrlStudent;

      this.StudentService.updateOneStudentWithPasswordWithImage(this.selectedStudentID, this.customStudent)
        .subscribe(
          (data) => {
            console.log("changed image and changed password");
            this.router.navigate(["/viewStudent/", this.selectedStudentID]);
          },
          (err) => {

            this.router.navigate(["/editStudent/", this.selectedStudentID]);

          });

    } else {
      console.log("sorry not found");

    }


  }

  onSubmit() {
    setTimeout(() => {
      this.UpdateStudent();
    }, 4000);

  }

  

}
