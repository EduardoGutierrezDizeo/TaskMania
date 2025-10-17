package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="task", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id"})
})
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long id;


    private String nombre;

    private String descripcion;

    private boolean estado;

    @ManyToOne
    @JoinColumn(name = "user_id")  // crea la columna user_id en la tabla task
    private User user;

}