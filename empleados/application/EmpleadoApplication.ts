import { EmpleadoRepository } from "../repository/EmpleadoRepository";
import {Empleado} from '../dto/Empleado';
export class EmpleadoApplication {
    constructor(private repository: EmpleadoRepository) { }

    save(user: Empleado) {
        return this.repository.save(user);
    }
    delete(id) {
        return this.repository.delete(id);
    }

    update(user: Empleado, id) {
        return this.repository.update(user, id);
    }

    getAll() {
        return this.repository.getAll();
    }

    getById(id) {
        return this.repository.getById(id);
    }
}