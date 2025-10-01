package com.example.demo.service;

import com.example.demo.dto.TaskRequest;
import com.example.demo.dto.TaskResponse;
import com.example.demo.model.Task;
import com.example.demo.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository repository;
    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    // crear un nuevo usuario
    public TaskResponse crear(TaskRequest request) {
        Task entity = new Task();
        entity.setNombre(request.getNombre());
        entity.setDescripcion(request.getDescripcion());
        entity.setEstado(request.isEstado());

        Task guardado = repository.save(entity);
        return new TaskResponse(guardado.getId(), guardado.getNombre(), guardado.getDescripcion(), guardado.isEstado());
    }

    // Listar todos los usuarios
    public List<TaskResponse> listar() {
        return repository.findAll()
                .stream()
                .map(u -> new TaskResponse(u.getId(), u.getNombre(), u.getDescripcion(), u.isEstado()))
                .collect(Collectors.toList());
    }

    // Listar por id
    public TaskResponse buscarPorId(Long id) {
        Task entity = repository.findById(id).
                orElseThrow(() -> new RuntimeException("Tarea no encontrada con id" + id));
        return new TaskResponse(entity.getId(), entity.getNombre(), entity.getDescripcion(), entity.isEstado());
    }

    // Actualizar usuario por id
    public TaskResponse actualizar(Long id, TaskRequest request) {
        Task entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada con id" + id));

        entity.setNombre(request.getNombre());
        entity.setDescripcion(request.getDescripcion());
        entity.setEstado(request.isEstado());

        Task actualizado = repository.save(entity);
        return new TaskResponse(actualizado.getId(), actualizado.getNombre(), actualizado.getDescripcion(), actualizado.isEstado());
    }

    public void eliminar(Long id) {
        if(!repository.existsById(id)){
            throw new RuntimeException("Tarea no encontrada con id" + id);
        }
        repository.deleteById(id);
    }

}