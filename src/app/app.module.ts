import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BugsListComponent } from './bugs-list/bugs-list.component';
import { SubmitBugComponent } from './submit-bug/submit-bug.component';

@NgModule({
  declarations: [
    AppComponent,
    BugsListComponent,
    SubmitBugComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
