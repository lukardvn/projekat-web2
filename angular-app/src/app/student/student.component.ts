import { HttpClient } from '@angular/common/http';
import { StudentService } from './../services/student.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';

@Component({
  selector: 'student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Array<Student> = new Array<Student>();

  constructor(private studentService: StudentService) {  
  }

  ngOnInit(): void {
    console.log("ONINIT");
    this.studentService.getAll().subscribe(result => {
      console.log("SABSKRAJBBB");
      this.students = [...result];
    }, err => {console.log(err)});
  }

  /*constructor(http: HttpClient){
    console.log("CONSTructor");
    http.get('https://localhost:44383/api/Students')
      .subscribe(response => {
        console.log(response);
      });
  }

  ngOnInit(): void {}*/

}
