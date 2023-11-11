import { Component, OnInit } from '@angular/core';
import { Observable,of ,tap,catchError} from 'rxjs';
import { Robot } from 'src/app/Interfaces/robot';
import { RobotService } from 'src/app/Services/robot.service';
import { Task } from 'src/app/Interfaces/task';
import { TaskService } from 'src/app/Services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-robots-task-designation',
  templateUrl: './list-robots-task-designation.component.html',
  styleUrls: ['./list-robots-task-designation.component.css']
})
export class ListRobotsTaskDesignationComponent implements OnInit {


  firstFormGroup!: FormGroup;


  isLinear=true;

  taskOrDesignation!:string;
  tasks!:Task[];
  robots?:Robot[];

  constructor(private robotService:RobotService,private taskService:TaskService,private _snackBar:MatSnackBar,private _formBuilder: FormBuilder){}

  ngOnInit() {
    this.getTasks();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
  }

  getTasks(){
    this.taskService.getTasks().subscribe(tasks => this.tasks=tasks);
  }

  getRobots() {
    this.taskOrDesignation=this.firstFormGroup.get("firstCtrl")?.value;
    this.robotService.getRobotsByTaskOrDesignation(this.taskOrDesignation).subscribe(robots => this.robots=robots);
  }

  
}
