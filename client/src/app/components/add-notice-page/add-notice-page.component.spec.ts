import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoticePageComponent } from './add-notice-page.component';

describe('AddNoticePageComponent', () => {
  let component: AddNoticePageComponent;
  let fixture: ComponentFixture<AddNoticePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNoticePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNoticePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
