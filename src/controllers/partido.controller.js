const Partido = require('../models/partido.model');

const getAll = async (req, res) => {
    try {
        const partidos = await Partido.getAll()
        return res.status(200).json(partidos)
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrió un error al conseguir los partidos',
            error: error.message
        })
    }
}

const getUpdated  = async (req, res) => {
    try {
        const idUltimoPartido = req.params.id;
        const nuevosPartidos = await Partido.getUpdated(idUltimoPartido);
        return res.status(200).json(nuevosPartidos)
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error al conseguir  los partidos actualizados',
            error: error.message
        })
    }
}

module.exports= {
    getAll,
    getUpdated
}