import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BugsListComponent } from './bugs-list/bugs-list.component';
import { SampleChangesGuard } from './rest.service';
import { SubmitBugComponent } from './submit-bug/submit-bug.component';


const routes: Routes = [
  { path: 'submitnewbug/:id',  component: SubmitBugComponent},
  { path: 'submitnewbug',  component: SubmitBugComponent},
  { path: '', component:  BugsListComponent},
  {
    path: '',  
    component: SubmitBugComponent,  
    canActivate:[SampleChangesGuard]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
