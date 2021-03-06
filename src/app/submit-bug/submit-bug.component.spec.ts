import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SubmitBugComponent } from './submit-bug.component';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('SubmitBugComponent', () => {
  let component: SubmitBugComponent;
  let fixture: ComponentFixture<SubmitBugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitBugComponent ],
      imports: [ReactiveFormsModule,
                RouterTestingModule,
                HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('Form is invalid', () => {
    expect(component.myForm.invalid).toBeTruthy();
  });

  fit('Form is valid with minimum required fields', () => {
    const titleControl = component.myForm.get('title');
    const descriptionControl = component.myForm.get('description');
    const priorityControl = component.myForm.get('priority');
    const reporterControl = component.myForm.get('reporter');
    const statusControl = component.myForm.get('status');

    titleControl.setValue('BugTitle');
    expect(titleControl.valid).toBeTruthy();

    descriptionControl.setValue('a bug');
    expect(descriptionControl.valid).toBeTruthy();

    priorityControl.setValue('Major');
    expect(priorityControl.valid).toBeTruthy();

    reporterControl.setValue('DEV');
    expect(reporterControl.valid).toBeTruthy();

    // statusControl.setValue('Done');
    // expect(statusControl.valid).toBeTruthy();

    expect(component.myForm.valid).toBeTruthy();
  });

  fit('Form is invalid setting only one field (e.g. reporter QA)', () => {
    const reporterControl = component.myForm.get('reporter');
    reporterControl.setValue('QA');
    expect(component.myForm.invalid).toBeTruthy();
  });

  fit('Form is valid with all fields', () => {
    const titleControl = component.myForm.get('title');
    const descriptionControl = component.myForm.get('description');
    const priorityControl = component.myForm.get('priority');
    const reporterControl = component.myForm.get('reporter');
    const statusControl = component.myForm.get('status');

    titleControl.setValue('BugTitle');
    expect(titleControl.valid).toBeTruthy();

    descriptionControl.setValue('a bug');
    expect(descriptionControl.valid).toBeTruthy();

    priorityControl.setValue('Major');
    expect(priorityControl.valid).toBeTruthy();

    reporterControl.setValue('PO');
    expect(reporterControl.valid).toBeTruthy();

    statusControl.setValue('Done');
    expect(statusControl.valid).toBeTruthy();

    expect(component.myForm.valid).toBeTruthy();
  });

});
