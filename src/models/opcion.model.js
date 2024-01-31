const pool = require("../config/db.config");

class Opcion {
    constructor({id_apuesta, id_equipo, puntos}) {
        this.id_apuesta = id_apuesta;
        this.id_equipo = id_equipo;
        this.puntos = puntos;
    }

    async save() {
        const query = 'INSERT INTO opcion (id_apuesta, id_equipo, puntos) VALUES (?,?,?)';
        const [result] = await pool.execute(query,[this.id_apuesta, this.id_equipo, this.puntos]);
        return result;
    }

    static async getAll(){
        let query = `SELECT o.id, o.id_apuesta, o.id_equipo, o.puntos, e.nombre_equipo FROM opcion as o INNER JOIN equipo as e ON o.id_equipo = e.id ;`;
        const [rows] = await pool.execute(query);
        return rows;
    }

    static updatedPoints = async ({id_detalle, id_equipo, tipo}) => {
        let operacion;
        if(tipo == "Gol") {
            operacion = " + 100 ";
        }else{
            operacion = " - 25 ";
        }
        const query = `UPDATE opcion AS o 
        SET puntos = puntos ${operacion}
        WHERE o.id_apuesta = (
            SELECT a.id 
            FROM apuesta AS a 
            INNER JOIN detalle AS d ON a.id_partido = d.id_partido 
            WHERE d.id = ?
            LIMIT 1
        ) 
        AND o.id_equipo = ?;`;
        const [result] = await pool.execute(query, [id_detalle, id_equipo]);
        return result;
    }
}

module.exports = Opcion;