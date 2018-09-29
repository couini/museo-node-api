import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
import app from '../src/server';
const expect = chai.expect;
const assert = require('assert');
const mongoose = require('mongoose');
const sinonmongoose = require('sinon-mongoose');
mongoose.Promise = global.Promise;

const sinon = require('sinon');
const request = require('request');

import Artist from '../src/models/artist';

describe('Artists assertions', () => {

    it('responds with object', () => {
        return chai.request(app).get('/api/artists')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });

    it('should artist name be required', (done) => {
        const entry = new Artist({
            'name': null, // name is null, it returns an error
            'firstname': 'Claude',
            'biography': 'Lorem Ipsum',
            'birthdate': '14 novembre 1840',
            'deathdate': '5 décembre 1926',
            'birthplace': 'Paris',
            'deathplace': 'Giverny',
            'slug': 'claude-monet',
            'picture': 'claude-monet.jpg'
        });

        entry.save((error) => {
            expect(error).to.not.be.null;
        });

        done();
    });

    it('GET artist', function(done) {

        const artists = [
            {
                name: "Monet",
                firstname: "Claude",
                biography: "Lorem Ipsum",
                birthdate: "14 novembre 1840",
                deathdate: "5 décembre 1926",
                birthplace: "Paris, France",
                deathplace: "Giverny, France",
                slug: "claude-monet",
                picture: "claude-monet.jpg"
            },
            {
                name: "van Gogh",
                firstname: "Vincent",
                biography: "Lorem Ipsum",
                birthdate: " 30 mars 1853",
                deathdate: "29 juillet 1890",
                birthplace: "Zundert, Pays-Bas",
                deathplace: "Auvers-sur-Oise, France",
                slug: "vincent-van-gogh",
                picture: "van-gogh.jpg"
            }
        ];

        let ArtistMock = sinon.mock(Artist);

        ArtistMock.expects('find')
            .chain('exec')
            .resolves(artists);

        Artist.find({ _id: 11459436 })
            .exec()
            .then(function(result) {
                ArtistMock.verify();
                ArtistMock.restore();
                assert.equal(result, artists);
                assert.equal(artists.length, 2);
                done();
            })
    });
});