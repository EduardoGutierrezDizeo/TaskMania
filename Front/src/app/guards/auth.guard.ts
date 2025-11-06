import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');

    if (user) {
      // Usuario autenticado → puede acceder
      return true;
    } else {
      // No autenticado → redirigir al login
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
