import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bugs } from './bugs';

@Injectable({
  
  providedIn: 'root'
})
export class RestService {
  private endpoint2 = "https://bug-report-system-server.herokuapp.com/bugs/";
  private endpoint = "https://bug-report-system-server.herokuapp.com/bugs";
  constructor(private http:HttpClient) { }

  getAllBugs(filterBy, ascending): Observable<Bugs> {

    let query = this.endpoint + '?sort='+filterBy+","+ 
    (ascending ? 'asc':'desc');
    return this.http.get<Bugs>(query);
  }


  addBug(bug:Bugs): Observable<Bugs>{
    return this.http.post<Bugs>(this.endpoint,bug);
  }

  // updateBug(bug: Bugs): Observable<Bugs>{
  //   return this.http.put<Bugs>(this.endpoint2, bug)
  // }

  getBug(id:string):Observable<Bugs>{
    return this.http.get<Bugs>(this.endpoint2+ id)

  }

  updateBug(id:number, bug:Bugs) : Observable<Bugs>{
    return this.http.put<Bugs>(this.endpoint2 + id, bug)        
  }
  
  
}
