package com.example.demo.controller;

import com.example.demo.dto.TaskRequest;
import com.example.demo.dto.TaskResponse;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.TaskService;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

    private final TaskService service;

    public TaskController (TaskService service) {
        this.service = service;
    }

    @PostMapping
    public TaskResponse crear(@RequestBody TaskRequest request){
        return service.crear(request);
    }

    // Http://localhost:8080/task
    @GetMapping
    public List<TaskResponse> Listar(){
        return service.listar();
    }

    // Http://localhost:8080/task/id
    @GetMapping("/{id}")
    public TaskResponse buscarPorId(@PathVariable Long id){
        return service.buscarPorId(id);
    }

    // Http://localhost:8080/task/id
    @PutMapping("/{id}")
    public TaskResponse actualizar(@PathVariable Long id, @RequestBody TaskRequest request){
        return service.actualizar(id, request);
    }

    // Http://localhost:8080/task/id
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        service.eliminar(id);
    }
}