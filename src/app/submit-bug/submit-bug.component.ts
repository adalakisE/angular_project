import { Component, getDebugNode, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { threadId } from 'worker_threads';
import { Bugs } from '../bugs';
import { BugsListComponent } from '../bugs-list/bugs-list.component';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-submit-bug',
  templateUrl: './submit-bug.component.html',
  styleUrls: ['./submit-bug.component.scss']
})
export class SubmitBugComponent implements OnInit {

  constructor(private restService: RestService, 
              private route: ActivatedRoute,
              private _router: Router) { }

  myForm: FormGroup;
  commentsForm: FormGroup;


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

  bugs: Bugs = {
    id: 0,
    title: 'null',
    description: 'null',
    priority: 0,
    reporter: 'null',
    status: 'null',
    updatedAt: new Date,
    createdAt: new Date,
    comments: [{
      name: 'null',
      comment: 'null'
    }]
  }

  devPO: boolean = false;

  ngOnInit(): void {


    this.id = this.route.snapshot.params["id"];

    if (this.id) {
      this.restService.getBug(this.id).subscribe(data => {
        this.bugs = data
        console.log(this.bugs);

        if (this.bugs.reporter === "DEV" || this.bugs.reporter == "PO") {
          this.devPO = true
        }

        this.myForm.setValue({
          title: this.bugs.title,
          description: this.bugs.description,
          priority: this.bugs.priority,
          reporter: this.bugs.reporter,
          status: this.bugs.status
        })

        this.commentsForm.setValue({

          name: this.bugs.reporter, //fix it with name
          comments: this.bugs.comments
        })

      });
    }


    this.myForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      priority: new FormControl(this.priorities, Validators.required),
      reporter: new FormControl(this.reporters, Validators.required),
      status: new FormControl(this.statuses)
    });

    this.commentsForm = new FormGroup({
      name: new FormControl("", Validators.required),
      comments: new FormControl("", Validators.required),
    })



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
      this.restService.updateBug(this.bugs.id, bug).subscribe((results)=>{
        console.log(results)
      })
    }
  }

}
