package com.example.demo.service;

import com.example.demo.dto.UserRequest;
import com.example.demo.dto.UserResponse;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository repository;
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    // crear un nuevo usuario
    public UserResponse crear(UserRequest request) {
        User entity = new User();
        entity.setNombre(request.getNombre());
        entity.setEmail(request.getEmail());
        entity.setTelefono(request.getTelefono());

        User guardado = repository.save(entity);
        return new UserResponse(guardado.getId(), guardado.getNombre(), guardado.getEmail(), guardado.getTelefono());
    }

    // Listar todos los usuarios
    public List<UserResponse> listar() {
        return repository.findAll()
                .stream()
                .map(u -> new UserResponse(u.getId(), u.getNombre(), u.getEmail(), u.getTelefono()))
                .collect(Collectors.toList());
    }

    // Listar por id
    public UserResponse buscarPorId(Long id) {
        User entity = repository.findById(id).
                orElseThrow(() -> new RuntimeException("Usuario no encontrado con id" + id));
        return new UserResponse(entity.getId(), entity.getNombre(), entity.getEmail(), entity.getTelefono());
    }

    // Actualizar usuario por id
    public UserResponse actualizar(Long id, UserRequest request) {
        User entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id" + id));

        entity.setNombre(request.getNombre());
        entity.setEmail(request.getEmail());
        entity.setTelefono(request.getTelefono());

        User actualizado = repository.save(entity);
        return new UserResponse(actualizado.getId(), actualizado.getNombre(), actualizado.getEmail(), actualizado.getTelefono());
    }

    public void eliminar(Long id) {
        if(!repository.existsById(id)){
            throw new RuntimeException("Usuario no encontrado con id" + id);
        }
        repository.deleteById(id);
    }

}