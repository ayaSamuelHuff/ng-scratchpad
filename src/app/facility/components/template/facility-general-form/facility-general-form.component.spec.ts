import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityGeneralFormComponent } from './facility-general-form.component';

describe('FacilityGeneralFormComponent', () => {
  let component: FacilityGeneralFormComponent;
  let fixture: ComponentFixture<FacilityGeneralFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityGeneralFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilityGeneralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
