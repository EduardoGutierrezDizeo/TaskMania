package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class TaskResponse {
    private Long id;
    private String nombre;
    private String descripcion;
    private boolean estado;
}