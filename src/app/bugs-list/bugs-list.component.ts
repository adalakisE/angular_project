import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'protractor';
import { Bugs } from '../bugs';
import { RestService } from '../rest.service';


@Component({
  selector: 'app-bugs-list',
  templateUrl: './bugs-list.component.html',
  styleUrls: ['./bugs-list.component.scss']
})
export class BugsListComponent implements OnInit {
  
  _bugs: Bugs;

  pageCounter:number = 0;
  private ascending: boolean = true;
  private filterBy = 'title';
  
  constructor(private restService:RestService, private _router: Router) { }

  ngOnInit(): void {
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
}
