import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService, Task } from '../../../services/task.service';

@Component({
  selector: 'app-form-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.css']
})
export class FormTaskComponent implements OnInit {

  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form!: FormGroup;
  id!: number;
  isEditMode = false;
  isLoading = false;
  isLoadingTask = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      estado: [false] 
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.isEditMode = true;
        this.loadTask();
      }
    });
  }

  loadTask() {
    this.isLoadingTask = true;

    this.taskService.getTaskById(this.id).subscribe({
      next: (task: Task) => {
        console.log("Tarea cargada:", task);

        // Asegurar conversión correcta de estado
        this.form.patchValue({
          ...task,
          estado: Boolean(task.estado)
        });

        this.isLoadingTask = false;
      },
      error: (err) => {
        console.error("Error cargando tarea:", err);
        this.isLoadingTask = false;
        alert('Error al cargar la tarea');
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // Solo enviamos los campos que espera el backend
    const taskRequest = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      estado: !!this.form.value.estado  // <-- asegura boolean
    };

    if (this.isEditMode) {
      this.taskService.updateTask(this.id, taskRequest).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Tarea actualizada');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error actualizando:', err);
          alert('Error al actualizar');
        }
      });
    } else {
      this.taskService.createTask(taskRequest).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Tarea creada exitosamente');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error creando:', err);
          alert('Error al crear tarea');
        }
      });
    }
  }

  loadingTask() {
    return this.isLoadingTask;
  }

  loading() {
    return this.isLoading;
  }
}
