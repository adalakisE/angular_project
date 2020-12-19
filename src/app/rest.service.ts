import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bugs } from './bugs';
import { CanDeactivate } from '@angular/router';


export interface SampleComponentCanDeactivate {  
  SamplecanDeactivate: () => boolean | Observable<boolean>;  
} 

export class SampleChangesGuard implements CanDeactivate<SampleComponentCanDeactivate> {  
  constructor() {  
  
  }  
  
  canDeactivate(  
    component: SampleComponentCanDeactivate  
  ): boolean | Observable<boolean> {  
     
      return component.SamplecanDeactivate()  
        ? true  
        : confirm(  
            "WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes."  
          );     
  }  
}  

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  constructor(private http:HttpClient) { }

  //private endpoint2 = "https://bug-report-system-server.herokuapp.com/bugs/";
  private endpoint = "https://bug-report-system-server.herokuapp.com/bugs";
  


  getAllBugs(filterBy, ascending, pageCounter, filterQuery): Observable<Bugs> {
    let query = this.endpoint + '?sort='+filterBy+","+ 
    (ascending ? 'asc':'desc')  + "&page="+ pageCounter +"&count=40" + filterQuery ;
    console.log(query)
    return this.http.get<Bugs>(query);
  }

  getFilteredBugs(filterQuery: string): Observable<Bugs>{
    let query = this.endpoint + filterQuery
    console.log(query)
    return this.http.get<Bugs>(query)
  }

  addBug(bug:Bugs): Observable<Bugs>{
    return this.http.post<Bugs>(this.endpoint,bug);
  }

  getBug(id:string):Observable<Bugs>{
    return this.http.get<Bugs>(this.endpoint + "/" + id)
  }

  updateBug(id:number, bug:Bugs) : Observable<Bugs>{
    return this.http.put<Bugs>(this.endpoint + "/" + id, bug)        
  }
  
  deleteBug(id:number) : Observable<Bugs>{
    return this.http.delete<Bugs>(this.endpoint + "/" + id)        
  }
  
}
