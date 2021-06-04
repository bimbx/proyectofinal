//CREATE TABLE productos (id SERIAL, nombre VARCHAR(60), descripcion VARCHAR(200), presentacion VARCHAR(60), marca VARCHAR(60), caducidad DATE, existencia INTEGER);

export class Empleado {
    private id: number;
    private nombre: string;
    constructor(id:number, nombre:string, private apellido: string, private puesto: string, private correo: string,
        private cumpleanos: Date,
        private ine: number) {
        this.id=id;
        this.nombre=nombre;
    }
    get _id() {
        return this.id;
    }
    get _nombre() {
        return this.nombre;
    }

    get _apellido() {
        return this.apellido;
    }

    get _puesto() {
        return this.puesto;
    }

    get _correo() {
        return this.correo;
    }
    get _cumpleanos() {
        return this.cumpleanos;
    }
    get _ine() {
        return this.ine;
    }

    set _id(id){
        this.id=id;
    }

}
