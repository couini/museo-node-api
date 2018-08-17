import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../src/server';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/artists', () => {

   it('responds with object', () => {
       return chai.request(app).get('/api/artists')
           .then(res => {
               expect(res.status).to.equal(200);
               expect(res).to.be.json;
               expect(res.body).to.be.an('array');
           });
   });

   it('should include Picasso', () => {
       return chai.request(app).get('/api/artists')
           .then(res => {
              let Picasso = res.body.find(artists => artists.name = 'Picasso');
              expect(Picasso).to.exist;
              expect(Picasso).to.have.all.keys([
                  '_id',
                  'biography',
                  'birthdate',
                  'deathdate',
                  'birthplace',
                  'deathplace',
                  'firstname',
                  'name',
                  'picture',
                  'slug'
              ])
           });
   });

   it('should return an artist by its slug', () => {
       return chai.request(app).get('/api/artists/pablo-picasso')
           .then(res => {
                let Picasso = res.body;
                expect(Picasso).to.exist;
                expect(res.body).to.be.an('object');

                expect(Picasso.name).to.equal('Picasso');
                expect(Picasso.firstname).to.equal('Pablo');
           });
   });

});

describe('POST api/artists', () => {

    it('should post an artist', () => {
        const artist = {
            name: 'Michel-Ange',
            firstname: null,
            biography: 'Lorem Ipsum',
            slug: 'michel-ange',
            picture: 'michel-ange.jpg',
            birthplace: 'Caprese Michelangelo, Italie',
            deathplace: 'Rome, Italie',
            birthdate: '1475',
            deathdate: '1564',
        };

        chai.request(app).post('/api/artists')
            .send(artist)
            .then((res) => {
               expect(res.status).to.equal(200);
            });
    });

});