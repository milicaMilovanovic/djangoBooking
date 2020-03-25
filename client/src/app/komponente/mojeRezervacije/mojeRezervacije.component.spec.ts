import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeRezervacijeComponent } from './mojeRezervacije.component';

describe('MojeRezervacijeComponent', () => {
  let component: MojeRezervacijeComponent;
  let fixture: ComponentFixture<MojeRezervacijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MojeRezervacijeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MojeRezervacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
