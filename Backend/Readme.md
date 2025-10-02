# TaskMania - Backend

Backend de **TaskMania**, una aplicación desarrollada en **Spring Boot** que gestiona usuarios y tareas.  
Este módulo expone una API REST para realizar operaciones CRUD sobre las entidades principales: **User** y **Task**.  

## 🚀 Tecnologías utilizadas
- Java 22  
- Spring Boot  
- Spring Data JPA  
- H2 Database (en memoria)  
- Maven  
- Lombok  

## 📂 Estructura del proyecto

src/main/java/com/example/demo/
├── controller
│ ├── TaskController.java
│ └── UserController.java
│
├── dto
│ ├── TaskRequest.java
│ ├── TaskResponse.java
│ ├── UserRequest.java
│ └── UserResponse.java
│
├── model
│ ├── Task.java
│ └── User.java
│
├── repository
│ ├── TaskRepository.java
│ └── UserRepository.java
│
└── service
├── TaskService.java
└── UserService.java


## ⚙️ Configuración

En `application.properties` está configurada la base de datos en memoria **H2**:

```properties
spring.application.name=demo

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

spring.datasource.url=jdbc:h2:mem:taskmania;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update

Consola H2: http://localhost:8080/h2-console

Driver: org.h2.Driver

URL: jdbc:h2:mem:taskmania

User: sa

Password: (vacío)

📌 Endpoints disponibles
🔹 Usuarios (/user)

POST /user → Crear usuario

{
  "nombre": "Celeste",
  "email": "celeste@example.com",
  "telefono": "3108250516"
}

GET /user → Listar todos los usuarios

GET /user/{id} → Obtener usuario por id

PUT /user/{id} → Actualizar usuario

DELETE /user/{id} → Eliminar usuario

Tareas (/task)

POST /task → Crear tarea

{
  "nombre": "Estudiar Spring",
  "descripcion": "Repasar controladores y servicios",
  "estado": true
}

GET /task → Listar todas las tareas

GET /task/{id} → Obtener tarea por id

PUT /task/{id} → Actualizar tarea

DELETE /task/{id} → Eliminar tarea

Ejecución

Clonar el repositorio

git clone <url-del-repo>
cd TaskMania/Backend

Compilar y ejecutar con Maven

mvn spring-boot:run

El servidor correrá en:

http://localhost:8080