import { EmpleadoApplication } from "../application/EmpleadoApplication";
import { Empleado } from "../dto/Empleado";
import { EmpleadoRepository } from "../repository/EmpleadoRepository";

const express = require('express')
const empleadoRouter = express.Router()

//OBTENER LISTADO DE USUARIOS
empleadoRouter.get('/empleado', (request, response) => {
    const userApp = new EmpleadoApplication(new EmpleadoRepository());
    userApp.getAll().then(result => {
        response.status(201);
        response.send(result)
    })
})

//CREAR USUARIOS
empleadoRouter.post('/empleado', (request, response) => {
    const userApp = new EmpleadoApplication(new EmpleadoRepository());
    const { nombre, apellido, puesto, correo, cumpleanos, ine  } = request.body;
    userApp.save(new Empleado( 0, nombre, apellido, puesto, correo, new Date(cumpleanos), ine )).then(result => {
        response.status(201);
        response.send(result);
    });

})

//EDITAR UN USUARIO
empleadoRouter.put('/empleado/:id', (request, response) => {
    const userApp = new EmpleadoApplication(new EmpleadoRepository());
    const { nombre, apellido, puesto, correo, cumpleanos, ine  } = request.body;
    userApp.update(new Empleado(0,nombre, apellido, puesto, correo, new Date(cumpleanos), ine), request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
})

//OBTENER DETALLES DE LOS USUARIOS
empleadoRouter.get('/empleado/:id', (request, response) => {
    const userApp = new EmpleadoApplication(new EmpleadoRepository());
    userApp.getById(request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
})


empleadoRouter.delete('/empleado/:id',(request,response)=>{
    const userApp = new EmpleadoApplication(new EmpleadoRepository());
    userApp.delete(request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
});

export { empleadoRouter };