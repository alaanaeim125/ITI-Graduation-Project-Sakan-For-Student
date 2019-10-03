import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/view_model/student';
import { AdminPageService } from 'src/app/service/admin-page.service';
import { FormLoginService } from 'src/app/service/form-login.service';


@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {

  selectedStudent: Student;
  image = '../assets/sakan.jpg';
  constructor(private activeSer: ActivatedRoute, private adminServ: AdminPageService 
    ,private FormLoginService:FormLoginService,private router:Router) { 

    this.selectedStudent=new Student();

  }

  ngOnInit() {

   // console.log("currentIdActive="+this.FormLoginService.CurrentStudentOrOwnerId);
    const id = this.activeSer.snapshot.params.id;
    this.adminServ.viewStudentById(id).subscribe((data) => {
      this.selectedStudent = data;
      this.selectedStudent.imgUrlStudent="http://localhost:5000/"+ this.selectedStudent.imgUrlStudent;
    },(err)=>{console.log(err);});


   // console.log("id="+this.FormLoginService.CurrentStudentOrOwnerId);

  }

}

