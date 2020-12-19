import { Component, getDebugNode, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bugs, Comment } from '../bugs';
import { HttpClient } from '@angular/common/http';
import { RestService, SampleComponentCanDeactivate } from '../rest.service';



@Component({
  selector: 'app-submit-bug',
  templateUrl: './submit-bug.component.html',
  styleUrls: ['./submit-bug.component.scss']
})
export class SubmitBugComponent implements OnInit {

  constructor(private restService: RestService,
              private route: ActivatedRoute,
              private _router: Router,
              private fb: FormBuilder) { }

  myForm: FormGroup;

  @HostListener("window:beforeunload")  
 selloutcanDeactivate(): Observable<boolean> | boolean {  
     return (  
         !this.myForm.dirty  
     );  
 } 

  priorities = new Map([
    ["Minor", 1],
    ["Major", 2],
    ["Critical", 3]
  ]);

  reporters = [
    "QA", "PO", "DEV"
  ]

  statuses = [
    "Ready for testing", "Done", "Rejected"
  ]

  id: string = 'null';


  get comments(){
    return this.myForm.get('comments') as FormArray;
  }

  bugs: Bugs = {
    id: 0,
    title: '',
    description: 'null',
    priority: 0,
    reporter: 'null',
    status: 'null',
    updatedAt: new Date,
    createdAt: new Date,
    comments: [{
      reporter: 'null',
      description: 'null',
      id: 'null'
    }]
  }

  get colors(){
    return this.myForm.get('colors') as FormArray
  }

  devPO: boolean = false;

  fillComments(comments: Comment[]){
    comments.forEach(comment => {
      this.pushComments(comment.reporter, comment.description)
    })
  }

  ngOnInit(): void {


    this.id = this.route.snapshot.params["id"];

    if (this.id) {
      this.restService.getBug(this.id).subscribe(data => {
        this.bugs = data
        console.log(this.bugs);

        if (this.bugs.reporter === "DEV" || this.bugs.reporter == "PO") {
          this.devPO = true
          console.log(this.devPO)
        }
        this.myForm.patchValue(
          this.bugs
        )
        this.fillComments(data.comments)
      });
    }

    this.myForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: [null],
      
      comments: this.fb.array([])
    
    });

    this.myForm.get('reporter').patchValue(null)
    this.myForm.get('status').patchValue(null)
    this.myForm.get('priority').patchValue(null)


    this.myForm.get('reporter').valueChanges.subscribe((value) => {
      if (value === 'QA') {
        this.myForm.get('status').setValidators(Validators.required)
      } else {
        this.myForm.get('status').clearValidators()
      }
      this.myForm.get('status').updateValueAndValidity()
    })
 
  }

  pushComments(report?: string, desc?: string){
  
  this.comments.push(this.fb.group({
    reporter: [report, ],
    description: [desc, ],
  }))
  }


  submitForm() {
    if (!this.myForm.valid) {
      return;
    }
    console.log(this.myForm.value);
    let bug: Bugs = this.myForm.value

    if (!this.id) {
      console.log('This is a new bug')
      this.restService.addBug(bug).subscribe((result) => {
        console.log(result);
        this._router.navigate(['/'])
      });

    } else {
      console.log('I will update a bug')
      this.restService.updateBug(this.bugs.id, bug).subscribe((results) => {
        console.log(results)
        this._router.navigate(['/'])
      })
    }
  }

}
