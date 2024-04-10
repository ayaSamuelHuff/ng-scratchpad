import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFacilityPageComponent } from './new-facility-page.component';

describe('NewFacilityPageComponent', () => {
  let component: NewFacilityPageComponent;
  let fixture: ComponentFixture<NewFacilityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFacilityPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewFacilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
