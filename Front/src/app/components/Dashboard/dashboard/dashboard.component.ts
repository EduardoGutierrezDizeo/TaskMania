import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, UserListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // ⚠ corregido
})
export class DashboardComponent implements OnInit {

  logout() {
  Swal.fire({
    title: '¿Cerrar sesión?',
    text: 'Se cerrará tu sesión actual.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, salir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#9333ea',
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/login']);
      Swal.fire('👋 Sesión cerrada', 'Has salido correctamente.', 'success');
    }
  });
}

  constructor(private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (!user) {
      // No hay usuario autenticado → redirigir al login
      this.router.navigate(['/auth/login']);
    }
  }
}
