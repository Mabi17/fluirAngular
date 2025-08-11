import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-planes',
  imports: [FormsModule, CommonModule],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent {

  productoService = inject(ProductoService);
  productos: any[] = [];
  nuevoPlan: Producto = { nombre: '', descripcion: '', costo: 0 };

  editModalOpen: boolean = false;
  selectedPlan: Producto = { id: 0, nombre: '', descripcion: '', costo: 0 };

  ngOnInit() {
    this.recargarPlanes();
  }

  recargarPlanes() {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  createPlan() {
    if (!this.nuevoPlan.nombre || !this.nuevoPlan.descripcion || this.nuevoPlan.costo <= 0) {
      return;
    }

    this.productoService.postProducto(this.nuevoPlan).subscribe(() => {
      this.recargarPlanes();
      this.nuevoPlan = { nombre: '', descripcion: '', costo: 0 };
    });
  }

  openEditModal(plan: Producto) {
    this.selectedPlan = { ...plan };
    this.editModalOpen = true;
  }

  closeEditModal() {
    this.editModalOpen = false;
    this.selectedPlan = { id: 0, nombre: '', descripcion: '', costo: 0 };
  }

  updatePlan() {
    if (!this.selectedPlan || !this.selectedPlan.nombre || !this.selectedPlan.descripcion || this.selectedPlan.costo <= 0) {
      return;
    }

    this.productoService.putProducto(this.selectedPlan).subscribe(() => {
      this.recargarPlanes();
      this.closeEditModal();
    });
  }

  deletePlan(id: number) {
    this.productoService.deleteProducto(id).subscribe(() => {
      this.recargarPlanes();
    });
  }

}
