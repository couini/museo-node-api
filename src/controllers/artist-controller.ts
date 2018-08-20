import Artist from '../models/artist'
import * as _ from 'lodash';
let mongoose = require('mongoose');
let Book = require('../models/artist');

export function getArtists(req, res) {
    let query = Artist.find({});
    query.exec((err, artists) => {
        if(err) {
            res.send(err);
        }

        res.send(200).send(artists);
    });
}

export function postArtist(req, res) {
    const newArtist = new Artist(req.body);

    newArtist.save((err, artist) => {
        if (err) {
            res.status(500).send(err);
        }

        res.status(200).send(artist);
    })
}

export function getArtist(req, res) {
    Artist.find({ slug: req.params.slug }, (err, artist) => {
        if (err) {
            res.status(500).send(err);
        } else if (_.isEmpty(artist)) {
            res.status(500).send({ status: 500, message: 'Artiste inexistant' });
        } else {
            res.status(200).send(artist);
        }
    });
}

export function putArtist(req, res) {
    Artist.findOneAndUpdate({ slug: req.params.slug }, req.body, (err, artist) => {
        if (err) {
            res.status(500).send(err);
        } else if (_.isEmpty(artist)) {
            res.status(500).send({ status: 500, message: 'Artiste inexistant' });
        } else {
            res.status(200).send(artist);
        }
    });
}

export function deleteArtist(req, res) {
    Artist.findOneAndRemove({ slug: req.params.slug }, (err) => {
        if (err) {
            res.status(500).send(err);
        }

        res.status(200).send();
    })
}