import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CotizacionService } from '../services/cotizacion.service';

@Component({
  selector: 'app-contactanos',
  imports: [ReactiveFormsModule],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css'
})
export class ContactanosComponent {
formulario: FormGroup;

  constructor(
    private cotizacionService: CotizacionService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      nombre: [''],
      correo: [''],
      telefono: [''],
      compania: [''],
      infraestructura: [false, Validators.required],
      estadoInfra: [0],
      fechaValoracion: [''],
      comentario: ['']
    });
  }

  onSubmit() {
    const formData = this.formulario.value;
    formData.infraestructura = document.querySelector<HTMLInputElement>('#infraSi')!.checked;
    formData.estadoInfra = Number((<HTMLInputElement>document.getElementById('estadoInfra'))?.value || 0);
    this.cotizacionService.enviarCotizacion(formData).subscribe({
    next: () => {
      alert('Cotización enviada correctamente');
      window.location.reload(); 
    },      
    error: err => alert('Error al enviar cotización')
    });
  }
}
