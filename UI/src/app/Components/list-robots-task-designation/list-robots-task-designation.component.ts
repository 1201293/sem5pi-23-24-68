import { Component, OnInit } from '@angular/core';
import { Observable,of ,tap,catchError} from 'rxjs';
import { Robot } from 'src/app/Interfaces/robot';
import { RobotService } from 'src/app/Services/robot.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-robots-task-designation',
  templateUrl: './list-robots-task-designation.component.html',
  styleUrls: ['./list-robots-task-designation.component.css']
})
export class ListRobotsTaskDesignationComponent implements OnInit {
  isLinear=true;

  robots?:Robot[];

  constructor(private robotService:RobotService,private _snackBar:MatSnackBar,private _formBuilder: FormBuilder){}

  ngOnInit() {
  }

  getRobots() {
    this.robotService.getRobots().subscribe(robots => this.robots=robots);
  }

  
}
