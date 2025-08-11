import { Component, inject } from '@angular/core';
import { ContratacionesService } from '../../services/contrataciones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstatusFilterPipe } from '../pipes/estatus-filter.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, EstatusFilterPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  contratacionesService = inject(ContratacionesService);
  contrataciones: any[] = [];
  filtroEstatus: number = 1; // Por defecto mostrar solo las activas

  ngOnInit() {
    this.cargarContrataciones();
  }

  cargarContrataciones() {
    this.contratacionesService.getContrataciones().subscribe(data => {
      this.contrataciones = data;
      console.log('Contrataciones cargadas:', this.contrataciones);
    });
  }
  getMontoTotal(): number {
    return this.contrataciones
      .filter(c => c.estatus === 1)
      .reduce((total, contratacion) => total + contratacion.monto, 0);
  }

  getMontoPromedio(): number {
    const activas = this.contrataciones.filter(c => c.estatus === 1);
    if (activas.length === 0) return 0;
    return activas.reduce((total, contratacion) => total + contratacion.monto, 0) / activas.length;
  }

}
