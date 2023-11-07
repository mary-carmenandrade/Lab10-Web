import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  nombre: string = '';
  email: string = '';
  ventanaEmergente: Window | null = null;
  datosUsuarios: string[] = [];

  @ViewChild('myForm') myForm: any;

  get isFormValid(): boolean {
    return this.myForm && this.myForm.form.valid;
  }

  confirmarEnvio() {
    if (confirm('¿Estás seguro de que deseas enviar el formulario?')) {
      this.onSubmit();
    }
  }
  abrirVentanaEmergente() {
    if (!this.ventanaEmergente || this.ventanaEmergente.closed) {
      this.ventanaEmergente = window.open('', '_blank');
    }
  }
  enviarDatosEnVentanaEmergente() {
    this.abrirVentanaEmergente();
    const datosFormulario = `Nombre: ${this.nombre}\nEmail: ${this.email}\n\n`;
    this.datosUsuarios.push(datosFormulario);
    this.actualizarVentanaEmergente();
  }
  actualizarVentanaEmergente() {
    if (this.ventanaEmergente) {
      this.ventanaEmergente.document.open();
      const titulo = '<h1>Lista de Usuarios</h1>';
      const datosCompletos = this.datosUsuarios.join('\n');
      this.ventanaEmergente.document.write(titulo);
      this.ventanaEmergente.document.write(`<pre>${datosCompletos}</pre>`);
      this.ventanaEmergente.document.close();
    }
  }
  onSubmit() {
    this.enviarDatosEnVentanaEmergente();
    console.log('Formulario enviado');
    console.log(`Nombre: ${this.nombre}`);
    console.log(`Email: ${this.email}`);
  }
}
