import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing Don Pedro, the Ecommerce', () => {
    describe ('Testing the login', () => {
        it('Should return a 200 status', async () => {
            const response = await requester.get('/session/login');
            expect(response.status).to.equal(200);
        });
     });
})
