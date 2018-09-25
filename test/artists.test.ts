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

        it('#find', function(done) {

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

/*
describe('GET api/artists', () => {

describe('Artists CRUD', () => {

    it('responds with object', () => {
        return chai.request(app).get('/api/artists')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });

    it('should name be required', (done) => {
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

    /*

    afterEach(function(done){
        Artist.collection.drop();
        done();
    });

   it('responds with object', () => {
       return chai.request(app).get('/api/artists')
           .then(res => {
               expect(res.status).to.equal(200);
               expect(res).to.be.json;
               expect(res.body).to.be.an('array');
           });
   });

   it('should include Monet', () => {
       return chai.request(app).get('/api/artists')
           .then(res => {
              let Monet = res.body.find(artists => artists.name = 'Monet');
              expect(Monet).to.exist;
              expect(Monet).to.have.all.keys([
                  '_id',
                  '__v',
                  'biography',
                  'birthdate',
                  'deathdate',
                  'birthplace',
                  'deathplace',
                  'firstname',
                  'name',
                  'picture',
                  'slug',
                  'uid'
              ])
           });
   });

   it('should return an artist by its slug', () => {
       return chai.request(app).get('/api/artists/claude-monet')
           .then(res => {
                let Monet = res.body;
                expect(Monet).to.exist;
                expect(res.body).to.be.an('object');

                expect(Monet.name).to.equal('Monet');
                expect(Monet.firstname).to.equal('Claude');
           });
   });

    it('should post an artist', () => {
        const artist = new Artist({
            name: 'Michel-Ange',
            firstname: null,
            biography: 'Lorem Ipsum',
            slug: 'michel-ange',
            picture: 'michel-ange.jpg',
            birthplace: 'Caprese Michelangelo, Italie',
            deathplace: 'Rome, Italie',
            birthdate: '1475',
            deathdate: '1564',
        });

        chai.request(app).post('/api/artists')
            .send(artist)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(2);
            });
    });
});
*/