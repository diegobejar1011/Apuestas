const pool = require('../config/db.config');

class Usuario {

    constructor({nombre, email, password}) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }

    static async getByEmail(email) {
        const query = 'SELECT * FROM usuario WHERE email = ?';
        const [rows] = await pool.execute(query, [email]);
        return rows[0];
    }

    static async getAll(){
        const query = 'SELECT * FROM usuario ';
        const [rows] = await pool.execute(query);
        return rows;
    }

    async save() {
        const query = 'INSERT INTO usuario (nombre, email, password) VALUES(?,?,?)';
        const [result] = await pool.execute(query,[this.nombre, this.email, this.password]);
        return result;
    }

    static async createBet({id_usuario, id_apuesta, id_opcion}) {
        const query = 'INSERT INTO usuario_apuesta (id_usuario, id_apuesta, id_opcion) VALUES (?,?,?)';
        const [result] = await pool.execute(query,[id_usuario, id_apuesta, id_opcion]);
        return result;
    }
}

module.exports = Usuario;