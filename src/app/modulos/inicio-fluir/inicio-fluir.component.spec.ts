import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioFluirComponent } from './inicio-fluir.component';

describe('InicioFluirComponent', () => {
  let component: InicioFluirComponent;
  let fixture: ComponentFixture<InicioFluirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioFluirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioFluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
