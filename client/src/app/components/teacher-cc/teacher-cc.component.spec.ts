import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCCComponent } from './teacher-cc.component';

describe('TeacherCCComponent', () => {
  let component: TeacherCCComponent;
  let fixture: ComponentFixture<TeacherCCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherCCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherCCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
