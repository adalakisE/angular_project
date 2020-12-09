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
  

  priorities=[
    "Minor","Major", "Critical"
  ]

  reporters=[
    "QA","PO","DEV"
  ]

  statuses=[
    "Ready for testing", "Done", "Rejected"
  ]


  ngOnInit(): void {
    this.myForm = new FormGroup({
      title:new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      priority: new FormControl(this.priorities, Validators.required),
      reporter:new FormControl(this.reporters, Validators.required),
      status: new FormControl(this.statuses)
    });

  this.myForm.get('reporter').valueChanges.subscribe((value)=>{
    if (value=== 'QA'){
      this.myForm.get('status').setValidators(Validators.required)
    }else{
      this.myForm.get('status').clearValidators()
    }
    this.myForm.get('status').updateValueAndValidity()
  })


  }

  
  formSubmit(){
    if(!this.myForm.valid){
      return;
    }
    console.log(this.myForm.value);
  }
}
