package com.example.demo.service;

import com.example.demo.dto.UserclassRequest;
import com.example.demo.dto.UserclassResponse;
import com.example.demo.model.Userclass;
import com.example.demo.repository.UserclassRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserclassService {
    private final UserclassRepository repository;
    public UserclassService(UserclassRepository repository) {
        this.repository = repository;
    }

    // crear un nuevo usuario
    public UserclassResponse crear(UserclassRequest request) {
        Userclass entity = new Userclass();
        entity.setNombre(request.getNombre());
        entity.setEmail(request.getEmail());
        entity.setTelefono(request.getTelefono());

        Userclass guardado = repository.save(entity);
        return new UserclassResponse(guardado.getId(), guardado.getNombre(), guardado.getEmail(), guardado.getTelefono());
    }

    // Listar todos los usuarios
    public List<UserclassResponse> listar() {
        return repository.findAll()
                .stream()
                .map(u -> new UserclassResponse(u.getId(), u.getNombre(), u.getEmail(), u.getTelefono()))
                .collect(Collectors.toList());
    }

    // Listar por id
    public UserclassResponse buscarPorId(Long id) {
        Userclass entity = repository.findById(id).
                orElseThrow(() -> new RuntimeException("Usuario no encontrado con id" + id));
        return new UserclassResponse(entity.getId(), entity.getNombre(), entity.getEmail(), entity.getTelefono());
    }

    // Actualizar usuario por id
    public UserclassResponse actualizar(Long id, UserclassRequest request) {
        Userclass entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id" + id));

        entity.setNombre(request.getNombre());
        entity.setEmail(request.getEmail());
        entity.setTelefono(request.getTelefono());

        Userclass actualizado = repository.save(entity);
        return new UserclassResponse(actualizado.getId(), actualizado.getNombre(), actualizado.getEmail(), actualizado.getTelefono());
    }

    public void eliminar(Long id) {
        if(!repository.existsById(id)){
            throw new RuntimeException("Usuario no encontrado con id" + id);
        }
        repository.deleteById(id);
    }

}
