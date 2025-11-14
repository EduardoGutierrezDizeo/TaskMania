import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  editingUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.error('❌ Error al cargar usuarios:', err);
      }
    });
  }

  // -------- EDITAR --------
  openEdit(user: User) {
    this.editingUser = { ...user }; // clon seguro
  }

  cancelEdit() {
    this.editingUser = null;
  }

  saveEdit() {
    if (!this.editingUser || !this.editingUser.id) return;

    this.userService.updateUser(this.editingUser.id, this.editingUser).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'Usuario actualizado correctamente', 'success');
        this.loadUsers();
        this.editingUser = null;
      },
      error: () => Swal.fire('Error', 'No se pudo actualizar', 'error')
    });
  }

  // -------- ELIMINAR --------
  deleteUser(id: number) {
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success');
            this.loadUsers();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar', 'error')
        });
      }
    });
  }
}
