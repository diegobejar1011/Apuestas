const pool = require('../config/db.config');

class Partido {
    constructor({equipos, fecha, hora}){
        this.equipos = equipos;
        this.fecha = fecha;
        this.hora = hora;
    }

    async save() {
        const query = 'INSERT INTO partido (equipo1, equipo2, fecha, hora) VALUES (?,?,?,?)';
        const [result] = await pool.execute(query,[this.equipos[0], this.equipos[1], this.fecha, this.hora]);
        return result;
    }

    static async getAll(){
        let query = `SELECT id, equipo1, equipo2, fecha, hora FROM partido`;
        const [rows] = await pool.execute(query);
        return rows;
    }

    static async getUpdated(id){
        const query = 'SELECT id, equipo1, equipo2, fecha, hora FROM partido WHERE id > ?';
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }
}

module.exports = Partido;