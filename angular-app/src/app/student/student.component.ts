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
    this.studentService.getAll().subscribe(result => {
      this.students = [...result];
      console.log(this.students);
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
