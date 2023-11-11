import { Component, OnInit } from '@angular/core';
import { Observable,of ,tap,catchError} from 'rxjs';
import { Robot } from 'src/app/Interfaces/robot';
import { RobotService } from 'src/app/Services/robot.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-disable-robot',
  templateUrl: './disable-robot.component.html',
  styleUrls: ['./disable-robot.component.css']
})
export class DisableRobotComponent implements OnInit {

  firstFormGroup!: FormGroup;

  isLinear=true;

  robots?:Robot[];

  constructor(private robotService:RobotService,private _snackBar:MatSnackBar,private _formBuilder: FormBuilder){}

  ngOnInit() {
    this.getRobots();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
  }

  getRobots() {
    this.robotService.getRobots().subscribe(robots => this.robots=robots);
  }

  disableRobots(){
    
  }
  
}
