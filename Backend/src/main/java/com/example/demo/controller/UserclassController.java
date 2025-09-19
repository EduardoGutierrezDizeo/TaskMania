package com.example.demo.controller;

import com.example.demo.dto.UserclassRequest;
import com.example.demo.dto.UserclassResponse;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.UserclassService;

import java.util.List;

@RestController
@RequestMapping("/userclass")
public class UserclassController {

    private final UserclassService service;

    public UserclassController (UserclassService service) {
        this.service = service;
    }

    @PostMapping
    public UserclassResponse crear(@RequestBody UserclassRequest request){
        return service.crear(request);
    }

    // Http://localhost:8080/userclass
    @GetMapping
    public List<UserclassResponse> Listar(){
        return service.listar();
    }

    // Http://localhost:8080/userclass/id
    @GetMapping("/{id}")
    public UserclassResponse buscarPorId(@PathVariable Long id){
        return service.buscarPorId(id);
    }

    // Http://localhost:8080/userclass/id
    @PutMapping("/{id}")
    public UserclassResponse actualizar(@PathVariable Long id, @RequestBody UserclassRequest request){
        return service.actualizar(id, request);
    }

    // Http://localhost:8080/userclass/id
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        service.eliminar(id);
    }
}
