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
               expect(res.body).to.be.an('object');
           });
   });

   it('should include Picasso', () => {
       return chai.request(app).get('/api/artists')
           .then(res => {
              let Picasso = res.body.artists.find(artists => artists.name = 'Picasso');
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
   })

});