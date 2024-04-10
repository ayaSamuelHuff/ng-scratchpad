import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityFormContainerComponent } from './facility-form-container.component';

describe('FacilityFormContainerComponent', () => {
  let component: FacilityFormContainerComponent;
  let fixture: ComponentFixture<FacilityFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityFormContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilityFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
