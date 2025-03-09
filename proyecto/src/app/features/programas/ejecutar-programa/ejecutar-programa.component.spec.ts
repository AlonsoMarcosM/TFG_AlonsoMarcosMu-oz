import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecutarProgramaComponent } from './ejecutar-programa.component';

describe('EjecutarProgramaComponent', () => {
  let component: EjecutarProgramaComponent;
  let fixture: ComponentFixture<EjecutarProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjecutarProgramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjecutarProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
