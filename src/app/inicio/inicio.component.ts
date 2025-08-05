import { Component } from '@angular/core';
import { ServiciosComponent } from '../servicios/servicios.component';
import { ConocenosComponent } from '../conocenos/conocenos.component';
import { ContactanosComponent } from '../contactanos/contactanos.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [ServiciosComponent, ConocenosComponent, ContactanosComponent, FooterComponent, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
