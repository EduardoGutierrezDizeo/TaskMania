import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // ⚠ corregido
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (!user) {
      // No hay usuario autenticado → redirigir al login
      this.router.navigate(['/auth/login']);
    }
  }
}
