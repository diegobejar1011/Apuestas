const pool = require('../config/db.config');

class Detalle {
    constructor({id_partido, id_equipo, tipo, minuto, jugador}) {
        this.id_partido = id_partido;
        this.id_equipo = id_equipo;
        this.tipo = tipo;
        this.minuto = minuto;
        this.jugador = jugador;
    }

    async save() {
        const query = 'INSERT INTO detalle (id_partido, id_equipo, tipo, minuto, jugador) VALUES (?,?,?,?,?)';
        const [result] = await pool.execute(query,[this.id_partido, this.id_equipo, this.tipo, this.minuto, this.jugador]);
        return result.insertId;
    }

    static async saveType ({nombre}) {
        const query = 'INSERT INTO tipo_detalle (nombre) VALUES (?)';
        const [result] = await pool.execute(query, [nombre]);
        return result;
    }

    static async getTypes () {
        const query = 'SELECT id, nombre FROM tipo_detalle';
        const [rows] = await pool.execute(query);
        return rows;
    }

    static async getAll({id_partido}) { 
        const query = `SELECT id, tipo, minuto, jugador FROM detalle WHERE id_partido = ?`;
        const [rows] = await pool.execute(query, [id_partido]);
        return rows;
    }

    static async getThanId(offset, idUsuario ) {
        const query =` SELECT * FROM detalle as d WHERE d.id_partido = (
            SELECT p.id
            FROM usuario_apuesta AS ua
            INNER JOIN usuario AS u
            ON ua.id_usuario = u.id
            INNER JOIN apuesta as a
            ON ua.id_apuesta = a.id
            INNER JOIN partido as p
            ON a.id_partido = p.id
            where ua.id_usuario= ?) 
            AND d.id > ?;`;
        const [rows] = await pool.execute(query, [offset, idUsuario]);
        return rows;
    }
}

module.exports = Detalle;