import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BugsListComponent } from './bugs-list/bugs-list.component';
import { SampleChangesGuard } from './rest.service';
import { SubmitBugComponent } from './submit-bug/submit-bug.component';
import { UnsavedFormGuard } from './unsaved-form.guard';


const routes: Routes = [
  { path: 'submitnewbug/:id',  component: SubmitBugComponent, canDeactivate:[UnsavedFormGuard]},
  { path: 'submitnewbug',  component: SubmitBugComponent,canDeactivate:[UnsavedFormGuard]},
  { path: '', component:  BugsListComponent},
  {
    path: '',  
    component: SubmitBugComponent,  
    canActivate:[SampleChangesGuard]  
  }
];

@NgModule({
  providers: [UnsavedFormGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
