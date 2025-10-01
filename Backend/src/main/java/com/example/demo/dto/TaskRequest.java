package com.example.demo.dto;

import lombok.Data;

@Data

public class TaskRequest {
    private String nombre;
    private String descripcion;
    private boolean estado;
}