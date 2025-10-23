import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../../services/task.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  tasks = signal<Task[]>([]);
  deletingIds = signal<number[]>([]);

  constructor(private taskService: TaskService) {} // ✅ inyección correcta

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => this.tasks.set(data),
      error: (err: unknown) => console.error('Error al cargar tareas:', err)
    });
  }

  isDeleting(id?: number): boolean {
    return id ? this.deletingIds().includes(id) : false;
  }

  eliminarTarea(id?: number): void {
    if (!id) return;
    const confirmar = confirm('¿Seguro que deseas eliminar esta tarea?');
    if (!confirmar) return;

    this.deletingIds.update(ids => [...ids, id]);

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks.update(tasks => tasks.filter(t => t.id !== id));
        this.deletingIds.update(ids => ids.filter(i => i !== id));
      },
      error: (err: unknown) => {
        console.error('Error al eliminar tarea:', err);
        this.deletingIds.update(ids => ids.filter(i => i !== id));
      }
    });
  }
}
