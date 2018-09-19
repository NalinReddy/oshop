import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingQuantityComponent } from './shopping-quantity.component';

describe('ShoppingQuantityComponent', () => {
  let component: ShoppingQuantityComponent;
  let fixture: ComponentFixture<ShoppingQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
