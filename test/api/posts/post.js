const mongoose=require('mongoose');


const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server.js');
const conn = require('../../../config/db.js');
const Post = require('../../../models/Post');


describe('GET /posts', () => {
  before((done) => {
    conn()
      .then(() => done())
      .catch((err) => done(err));
  })

  after((done) => {
    mongoose.disconnect()
      .then(() => done())
      .catch((err) => done(err));
  })

//   it('Hello', (done)=>{
//       expect(5).to.equal(5);
//       done();
//   })

  it('OK, getting posts has no post', (done) => {
    //   setTimeout(()=>{
    //     try{
    //         const result = await request(app).get('/api/posts')
    //        // const body = result.body;
    //        expect(result.length).to.equal(0);
    //        done();
    //      }catch(err){
    //          console.log(err);
    //      }
    //   },3000)
    request(app)
    .get('/api/posts')
    .end((err,res)=>{
        expect(res.body.length).to.equal(0)
        done();
    })
     
      })
     


//   it('OK, getting notes has 1 note', (done) => {
//     request(app).post('/api/notes')
//       .send({ name: 'NOTE TEST', text: 'BBB' })
//       .then((res) => {
//         request(app).get('/notes')
//           .then((res) => {
//             const body = res.body;
//             expect(body.length).to.equal(1);
//             done();
//           })
//       })
//       .catch((err) => done(err));
//   });
});
