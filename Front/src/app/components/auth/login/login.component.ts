import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  loginUser() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.userService.login(this.email, this.password).subscribe({
  next: (res: any) => {
    console.log('✅ Login exitoso:', res);
    alert('Inicio de sesión exitoso');
    localStorage.setItem('user', JSON.stringify(res));
    this.router.navigate(['/dashboard']);
  },
  error: (err: any) => {
    console.error('❌ Error al iniciar sesión:', err);
    alert('Credenciales incorrectas');
  }
});

  }
}
