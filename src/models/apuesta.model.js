const pool = require('../config/db.config');

class Apuesta {
    constructor({idPartido, descripcion, activa, resultado}){
        this.idPartido = idPartido;
        this.descripcion = descripcion;
        this.activa = activa;
        this.resultado = resultado;
    }

    async save() {
        const query = 'INSERT INTO apuesta (id_partido, descripcion, activa, resultado) VALUES (?,?,?,?)';
        const [result] = await pool.execute(query,[this.idPartido, this.descripcion, this.activa, this.resultado]);
        return result.insertId;
    }

    static async getAll(){
        let query = `SELECT id, id_partido, descripcion, activa FROM apuesta WHERE activa = "Y"`;
        const [rows] = await pool.execute(query);
        return rows;
    }

    static async updateById (resultado, id) {
        const query = 'UPDATE apuesta SET activa = 0, resultado = ? WHERE id = ?';

        const [result] = await pool.execute(query, [resultado, id]);

        return result;
    }

    static async getWinners({id_apuesta}) {
        const query = 'SELECT ua.id, ua.id_usuario, ua.id_apuesta, ua.id_opcion, u.nombre, o.puntos FROM usuario_apuesta as ua INNER JOIN usuario as u ON ua.id_usuario = u.id INNER JOIN apuesta as a ON ua.id_apuesta = a.id AND ua.id_opcion = a.resultado INNER JOIN opcion as o ON ua.id_opcion = o.id WHERE ua.id_apuesta = ?';
        const [rows] = await pool.execute(query,[id_apuesta]);
        return {rows, tipo: "W"};
    }

    static async getLosers({id_apuesta}) {
        const query = "SELECT ua.id, ua.id_usuario, ua.id_apuesta, ua.id_opcion, u.nombre, o.puntos FROM usuario_apuesta as ua INNER JOIN usuario as u ON ua.id_usuario = u.id INNER JOIN apuesta as a ON ua.id_apuesta = a.id AND ua.id_opcion != a.resultado INNER JOIN opcion as o ON ua.id_opcion  o.id WHERE ua.id_usuario= ?;";
        const [rows] = await pool.execute(query,[id_apuesta]);
        return {rows, tipo: "L"};
    }

    
}

module.exports = Apuesta;