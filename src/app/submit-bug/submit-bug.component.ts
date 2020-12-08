import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit-bug',
  templateUrl: './submit-bug.component.html',
  styleUrls: ['./submit-bug.component.scss']
})
export class SubmitBugComponent implements OnInit {

  constructor() { }

myForm:FormGroup; 
  
  ngOnInit(): void {
    this.myForm = new FormGroup({
      title:new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      priority: new FormControl("", Validators.required),
      reporter:new FormControl("", Validators.required),
      status: new FormControl("", Validators.required)
    });


  }
  /*formSubmit(){
    if(!this.formSubmit.valid){
      return;
    }
    console.log(this.formSubmit.value);
  }*/
}
