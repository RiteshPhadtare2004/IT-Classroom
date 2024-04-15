import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoticeButtonComponent } from './add-notice-button.component';

describe('AddNoticeButtonComponent', () => {
  let component: AddNoticeButtonComponent;
  let fixture: ComponentFixture<AddNoticeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNoticeButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNoticeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
