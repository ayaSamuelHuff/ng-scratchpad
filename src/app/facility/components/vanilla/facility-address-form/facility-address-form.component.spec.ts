import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityAddressFormComponent } from './facility-address-form.component';

describe('FacilityAddressFormComponent', () => {
  let component: FacilityAddressFormComponent;
  let fixture: ComponentFixture<FacilityAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityAddressFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilityAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
