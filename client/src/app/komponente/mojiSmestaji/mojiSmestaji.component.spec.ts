import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MojiSmestajiComponent } from './mojiSmestaji.component';

describe('MojiSmestajiComponent', () => {
  let component: MojiSmestajiComponent;
  let fixture: ComponentFixture<MojiSmestajiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MojiSmestajiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MojiSmestajiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
