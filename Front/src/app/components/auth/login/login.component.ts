import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  loginUser() {
    this.userService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        console.log('✅ Login exitoso:', res);
        localStorage.setItem('user', JSON.stringify(res));

        Swal.fire({
          title: '¡Bienvenido! 🎉',
          text: 'Inicio de sesión exitoso.',
          icon: 'success',
          confirmButtonColor: '#9333ea',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          willClose: () => {
            this.router.navigate(['/dashboard']);
          }
        });
      },
      error: (err: any) => {
        console.error('❌ Error al iniciar sesión:', err);
        Swal.fire({
          title: 'Error',
          text: 'Correo o contraseña incorrectos.',
          icon: 'error',
          confirmButtonColor: '#9333ea',
        });
      }
    });
  }
}
