import { Empleado } from '../dto/Empleado';
import { PostgresConnection } from "../../shared/repository/Connections";

export class EmpleadoRepository {
    private pgConnection: PostgresConnection;

    constructor() {
        PostgresConnection.getConnection();
        this.pgConnection = PostgresConnection.getConnection();
    }
    save(empleado: Empleado): Promise<Empleado> {
        //CREATE TABLE productos (id SERIAL, nombre VARCHAR(60), descripcion VARCHAR(200), presentacion VARCHAR(60), marca VARCHAR(60), caducidad DATE, existencia INTEGER);

        return this.pgConnection.execute('INSERT INTO empleado_bimbi(nombre, apellido, puesto, correo, cumpleanos, ine ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [empleado._nombre, empleado._apellido, empleado._puesto, empleado._correo, empleado._cumpleanos, empleado._ine]).then(
            (res) => {
                const { id, nombre, apellido, puesto, correo, cumpleanos, ine } = res.rows[0];
                return new Empleado(id, nombre, apellido, puesto, correo, cumpleanos, ine);
            }
        );
    }

    delete(id: any): Promise<void> {
        return this.pgConnection.execute('DELETE FROM empleado_bimbi WHERE id = $1', [id]).then(() => { });
    }
    update(user: Empleado, id: any): Promise<Empleado> {
        return this.pgConnection.execute('UPDATE empleado_bimbi SET nombre=$1, apellido=$2, puesto=$3, correo=$4, cumpleanos=$5, ine=$6  WHERE id = $7', [user._nombre, user._apellido, user._puesto, user._correo, user._cumpleanos, user._ine, id]).then((result) => {
            user._id = id;
            return user;
        });
    }

    getAll(): Promise<Empleado[]> {
        return this.pgConnection.execute('SELECT * FROM empleado_bimbi').then(
            (res) => {
                const rows = res.rows;
                return rows.map(row => {
                    const {id, nombre, apellido, puesto, correo, cumpleanos, ine} = row;
                    return new Empleado(id, nombre, apellido, puesto, correo, cumpleanos, ine);
                })
            }
        );
    }

    getById(id: any): Promise<Empleado> {
        return this.pgConnection.execute('SELECT * FROM empleado_bimbi WHERE id = $1 LIMIT 1', [id]).then(
            (res) => {
                const { id, nombre, apellido, puesto, correo, cumpleanos, ine } = res.rows[0];
                return new Empleado(nombre, apellido, puesto, correo, cumpleanos, ine, id);
            }
        );
    }
}
