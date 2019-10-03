import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/view_model/student';
import { AdminPageService } from 'src/app/service/admin-page.service';
import { FormLoginService } from 'src/app/service/form-login.service';

@Component({
  selector: 'app-view-student-admin',
  templateUrl: './view-student-admin.component.html',
  styleUrls: ['./view-student-admin.component.scss']
})
export class ViewStudentAdminComponent implements OnInit {

  selectedStudent: Student;
  image = '../assets/sakan.jpg';
  constructor(private activeSer: ActivatedRoute, private adminServ: AdminPageService ,private FormLoginService:FormLoginService) { 

    this.selectedStudent=new Student();

  }

  ngOnInit() {
    const id = this.activeSer.snapshot.params.id;
    this.adminServ.viewStudentById(id).subscribe((data) => {
      this.selectedStudent = data;
      this.selectedStudent.imgUrlStudent = "http://localhost:5000/"+this.selectedStudent.imgUrlStudent;   });
  }

}

