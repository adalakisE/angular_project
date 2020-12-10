import { Component, getDebugNode, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bugs } from '../bugs';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-submit-bug',
  templateUrl: './submit-bug.component.html',
  styleUrls: ['./submit-bug.component.scss']
})
export class SubmitBugComponent implements OnInit {
  
  

  constructor(private restService:RestService,private route: ActivatedRoute) { }

myForm:FormGroup; 
  

  priorities=new Map([
    [ "Minor", 1 ],
    [ "Major", 2 ],
    [ "Critical", 3 ]
  ]);

  reporters=[
    "QA","PO","DEV"
  ]

  statuses=[
    "Ready for testing", "Done", "Rejected"
  ]

  id:string;


  ngOnInit(): void {
    this.myForm = new FormGroup({
      title:new FormControl(" ", Validators.required),
      description: new FormControl("", Validators.required),
      priority: new FormControl(this.priorities, Validators.required),
      reporter:new FormControl(this.reporters, Validators.required),
      status: new FormControl(this.statuses)
    });
  this.myForm.get('reporter').patchValue(null)
  this.myForm.get('status').patchValue(null)
  this.myForm.get('priority').patchValue(null)
  

  
  console.log(this.route.snapshot.params["id"]);
  
  this.id=this.route.snapshot.params["id"];
  this.restService.getBug(this.id).subscribe(data=>{
    console.log(data);
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

  submitForm(){
    if(!this.myForm.valid){
      return;
    }
    console.log(this.myForm.value);
    let bug:Bugs= this.myForm.value
    this.restService.addBug(bug).subscribe((result)=>{
      console.log(result);
    });
  }
  
}
