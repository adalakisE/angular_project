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
  private ascending: boolean = true;
  private filterBy = 'title';

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
    this.restService.getAllBugs(this.filterBy, this.ascending, this.pageCounter).subscribe((bugs)=>{
      console.log(bugs);
      this.bugs = bugs;
      
      if(this.bugs[9] === undefined){
        this.pageCounter=0;
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
    this.getAllBugs();
  }

  nextPage(){
    this.pageCounter++;
    //if(this.bugs[0].length)
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

    let filterQuery = "?" + 
                       "&title=" + this.searchForm.value.title +
                       "&priority=" + this.searchForm.value.priority +
                       "&reporter=" + this.searchForm.value.reporter + 
                       "&status=" + this.searchForm.value.status;

    this.restService.getFilteredBugs(filterQuery).subscribe(data => {
      this.bugs = data;
    })
  }
}
