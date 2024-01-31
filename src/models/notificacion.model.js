const pool = require('../config/db.config');

class Notificacion {
    constructor({id_usuario, id_apuesta, id_opcion, puntos}, tipo){
        this.id_usuario = id_usuario;
        this.id_apuesta = id_apuesta;
        this.id_opcion = id_opcion
        this.puntos = puntos;
        this.tipo = tipo;
    }

    static async getAll() {
        const query = `SELECT * FROM notificacion`;
        const [rows] = await pool.execute(query);
        return rows;
    }

    async save() {
        const query = `INSERT INTO notificacion (id_usuario, id_apuesta, id_opcion, puntos, tipo) VALUES (?,?,?,?,?)`;
        const [result] = await pool.execute(query, [this.id_usuario, this.id_apuesta, this.id_opcion, this.puntos, this.tipo]);
        return result;
    }

}

module.exports = Notificacion;