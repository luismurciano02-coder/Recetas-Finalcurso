import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaService } from '../../services/receta.service';
import { RecetaPayload } from '../../models/receta.model';

@Component({
  selector: 'app-receta-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './receta-form.component.html',
  styleUrls: ['./receta-form.component.css']
})
export class RecetaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recetaService = inject(RecetaService);

  formulario!: FormGroup;
  esEdicion = false;
  recetaId: string | null = null;
  cargando = false;
  guardando = false;
  error: string | null = null;
  mostrarError = false;
  mostrarValidaciones = false;
  exito = false;

  categoriasDisponibles = ['Española', 'Arroces', 'Tapas', 'Saludable', 'Rápida', 'Postre'];

  constructor() {
    this.inicializarFormulario();
  }

  ngOnInit(): void {
    this.recetaId = this.route.snapshot.paramMap.get('id');
    if (this.recetaId) {
      this.esEdicion = true;
      this.cargarReceta();
    }

    this.recetaService.cargando$.subscribe(value => {
      this.cargando = value;
    });

    this.recetaService.error$.subscribe(value => {
      this.error = value;
      this.mostrarError = !!value;
    });
  }

  validarCategorias(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string[];
    return Array.isArray(value) && value.length > 0 ? null : { categoriasRequired: true };
  }

  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1200)]],
      ingredientes: ['', [Validators.required, Validators.minLength(5)]],
      instrucciones: ['', [Validators.required, Validators.minLength(5)]],
      categorias: [[], [this.validarCategorias]],
      valoracion: this.fb.group({
        puntuacion: [1, [Validators.required, Validators.min(0), Validators.max(5)]],
        votos: [1, [Validators.required, Validators.min(0)]],
      })
    });
  }

  cargarReceta(): void {
    if (!this.recetaId) return;

    this.recetaService.obtenerRecetaPorId(this.recetaId).subscribe({
      next: (receta) => {
        this.formulario.patchValue({
          nombre: receta.nombre,
          descripcion: receta.descripcion,
          ingredientes: receta.ingredientes,
          instrucciones: receta.instrucciones,
          categorias: receta.categorias,
          valoracion: {
            puntuacion: receta.valoracion?.puntuacion ?? 1,
            votos: receta.valoracion?.votos ?? 1,
          },
        });
      },
      error: () => {
        this.error = 'Error al cargar la receta';
        this.mostrarError = true;
      }
    });
  }

  alternarCategoria(categoria: string): void {
    const control = this.formulario.get('categorias');
    const actuales = (control?.value || []) as string[];
    const yaSeleccionada = actuales.includes(categoria);
    const nuevasCategorias = yaSeleccionada
      ? actuales.filter((item) => item !== categoria)
      : [...actuales, categoria];

    control?.setValue(nuevasCategorias);
    control?.markAsTouched();
  }

  guardarReceta(): void {
    this.mostrarValidaciones = true;

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.error = 'Revisa los campos obligatorios';
      this.mostrarError = true;
      return;
    }

    this.guardando = true;
    const formValue = this.formulario.value;
    const datos: RecetaPayload = {
      nombre: formValue.nombre?.trim(),
      descripcion: formValue.descripcion?.trim(),
      ingredientes: formValue.ingredientes?.trim(),
      instrucciones: formValue.instrucciones?.trim(),
      categorias: formValue.categorias,
      valoracion: {
        puntuacion: Number(formValue.valoracion?.puntuacion),
        votos: Number(formValue.valoracion?.votos),
      },
    };

    const operacion = this.esEdicion
      ? this.recetaService.actualizarReceta(this.recetaId!, datos)
      : this.recetaService.crearReceta(datos);

    operacion.subscribe({
      next: () => {
        this.exito = true;
        this.guardando = false;
        setTimeout(() => {
          this.router.navigate(['/recetas']);
        }, 1200);
      },
      error: (err) => {
        this.guardando = false;
        const mensajeError = err.error?.status || 'Error al guardar la receta';
        this.error = mensajeError;
        this.mostrarError = true;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/recetas']);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.formulario.get(fieldName);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) return 'Este campo es obligatorio';
    if (control.errors['minlength']) {
      const minLength = control.errors['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (control.errors['maxlength']) {
      const maxLength = control.errors['maxlength'].requiredLength;
      return `Máximo ${maxLength} caracteres`;
    }
    if (control.errors['min']) {
      const min = control.errors['min'].min;
      return `El valor mínimo es ${min}`;
    }
    if (control.errors['max']) {
      const max = control.errors['max'].max;
      return `El valor máximo es ${max}`;
    }
    if (control.errors['categoriasRequired']) return 'Selecciona al menos una categoría';
    return 'Campo inválido';
  }

  tieneError(fieldName: string): boolean {
    const control = this.formulario.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

}
