package com.example.demo.controller;

import com.example.demo.dto.UserRequest;
import com.example.demo.dto.UserResponse;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService service;

    public UserController (UserService service) {
        this.service = service;
    }

    @PostMapping
    public UserResponse crear(@RequestBody UserRequest request){
        return service.crear(request);
    }

    // Http://localhost:8080/user
    @GetMapping
    public List<UserResponse> Listar(){
        return service.listar();
    }

    // Http://localhost:8080/user/id
    @GetMapping("/{id}")
    public UserResponse buscarPorId(@PathVariable Long id){
        return service.buscarPorId(id);
    }

    @PostMapping("/auth/login")
    public UserResponse login(@RequestBody UserRequest request) {
        return service.login(request.getEmail(), request.getPassword());
    }

    // Http://localhost:8080/user/id
    @PutMapping("/{id}")
    public UserResponse actualizar(@PathVariable Long id, @RequestBody UserRequest request){
        return service.actualizar(id, request);
    }

    // Http://localhost:8080/user/id
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        service.eliminar(id);
    }
}