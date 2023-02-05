const { response } = require('express');

const Evento = require('../model/Evento');


const getEvents = async( req, res = response ) => {

    try {

        const eventos = await Evento.find().populate('user', 'name');
    
        res.json({
            ok: true,
            eventos
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno hable con el administrador'
        });

    }

};

const createEvent = async( req, res = response ) => {

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;

        const eventSaved = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventSaved
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno hable con el administrador'
        });

    }



};

const updateEvent = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no se encuentra en nuestra base de datos'
            });
        };

        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para realizar esta peticion'
            });
        };

        const newEvent = {
            ...req.body,
            user: uid
        };


        const eventUpdated = await Evento.findByIdAndUpdate( eventoId, newEvent, { new: true } );

        res.json({
            ok: true,
            evento: eventUpdated,
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno hable con el administrador'
        });

    }


};

const deleteEvent = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no se encuentra en nuestra base de datos'
            });
        };

        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para realizar esta peticion'
            });
        };


        const eventDeleted = await Evento.findByIdAndDelete( eventoId , { new : true });

        res.json({
            ok: true,
            msg: 'evento eliminado correctamente',
            evento: eventDeleted,
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno hable con el administrador'
        });

    }

};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}