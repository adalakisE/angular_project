import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BugsListComponent } from './bugs-list/bugs-list.component';
import { SubmitBugComponent } from './submit-bug/submit-bug.component';

const routes: Routes = [
  { path: 'submitnewbug',  component: SubmitBugComponent},
  { path: '', component:  BugsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
