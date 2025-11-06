import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private userService: UserService) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const newUser: User = {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    };

    this.userService.createUser(newUser).subscribe({
      next: (res) => {
        console.log('✅ Usuario creado:', res);
        alert('Usuario registrado correctamente');
      },
      error: (err) => {
        console.error('❌ Error al crear usuario:', err);
        alert('Error al registrar el usuario');
      }
    });
  }
}
