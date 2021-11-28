import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrodetailComponent } from './carrodetail.component';

describe('CarrodetailComponent', () => {
  let component: CarrodetailComponent;
  let fixture: ComponentFixture<CarrodetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrodetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrodetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
