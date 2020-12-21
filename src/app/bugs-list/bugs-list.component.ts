import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'protractor';
import { runInThisContext } from 'vm';
import { Bugs } from '../bugs';
import { RestService } from '../rest.service';


@Component({
  selector: 'app-bugs-list',
  templateUrl: './bugs-list.component.html',
  styleUrls: ['./bugs-list.component.scss']
})
export class BugsListComponent implements OnInit {
  
  _bugs: Bugs;

  searchForm: FormGroup;
  pageCounter:number = 0;
  pageCounterEnd:number = 0;
  private ascending: boolean = true;
  private filterBy = 'title';
  filterQuery: string;

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
  
  constructor(private restService:RestService, private _router: Router) { }

  ngOnInit(): void {
    
    this.searchForm = new FormGroup({
      title: new FormControl(""),
      priority: new FormControl(""),
      reporter: new FormControl(""),
      status: new FormControl("")
    });


    this.getAllBugs();
  }

  getAllBugs(){
    console.log(this.filterQuery)
    this.restService.getAllBugs(this.filterBy, this.ascending, this.pageCounter, this.filterQuery).subscribe((bugs)=>{
      console.log(bugs);
      this.bugs = bugs;
      
      if(this.bugs[9] === undefined){
        console.log("end of pages🥳🥳")
        this.pageCounterEnd=1;
        if(this.pageCounter<0){
          this.pageCounter=0;
        }
      }
    });
  }

  filterUp(filterValue){
    if(this.filterBy == filterValue){
      
      this.ascending = !this.ascending;
    }
    this.filterBy = filterValue;

    
    this.getAllBugs();
  }

  set bugs(value){
    this._bugs = value;
  }
  get bugs(){
    return this._bugs;
  }
  
  prevPage(){
    this.pageCounter--;
    if(this.pageCounter<0) this.pageCounter=0;
    console.log(this.pageCounter+'😍😍')
    this.getAllBugs();
  }

  nextPage(){
    if(this.pageCounter==0){
      this.pageCounterEnd=0;
    }
    console.log("next page🥵🥵")
    this.pageCounter = this.pageCounter + 1 - this.pageCounterEnd;
    this.pageCounterEnd = 0;
    //if(this.pageCounter<0) this.pageCounter=1;
    //if(this.bugs[0].length)
    console.log(this.pageCounter+'😍😍')
    console.log(this.bugs[0])

 
    this.getAllBugs();
  }

  onClick(bug:Bugs){
     this._router.navigate(['/submitnewbug',bug.id])
     console.log(bug);
  }
  onDelete(bug:Bugs){
    this.restService.deleteBug(bug.id).subscribe(data=>{
      console.log(data)
      this.getAllBugs();
    })
  }

  submitSearchForm(){
    console.log("submit search")
    console.log(this.searchForm.value)
    
    if(this.searchForm.value.title===null){
      this.searchForm.value.title="";
    }
    if(this.searchForm.value.priority===null){
      this.searchForm.value.priority="";
    }
    if(this.searchForm.value.reporter===null){
      this.searchForm.value.reporter="";
    }
    if(this.searchForm.value.status===null){
      this.searchForm.value.status="";
    }

    this.filterQuery = 
                      //"?" + 
                       "&title=" + this.searchForm.value.title +
                       "&priority=" + this.searchForm.value.priority +
                       "&reporter=" + this.searchForm.value.reporter + 
                       "&status=" + this.searchForm.value.status;

    this.getAllBugs();
  }
}
