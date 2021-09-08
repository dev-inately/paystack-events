/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const testData = require('./mock.js');

// Configure chai
chai.use(chaiHttp);
chai.should();

const { expect } = chai;

const PaystackEvents = require('..');

const paystackEvents = new PaystackEvents(testData.MOCK_PAYSTACK_SECRET_KEY);

function bootStrapApp() {
  const app = express();
  app.use(express.json());
  app.post('/webhook', paystackEvents.webhook());
  app.listen(7339);
  return app;
}

describe('Test Paystack Events Middleware', () => {
  before(function () {
    this.app = chai.request(bootStrapApp()).keepOpen();
  });

  it('should not instantiate PaystackEvents without API key', (done) => {
    expect(PaystackEvents).to.throw('You must supply your `Paystack` API key!');
    done();
  });

  it('should return a 400 bad request - No header & body', function (done) {
    this.app
      .post('/webhook')
      .set('Content-Type', 'application/json')
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return a 400 bad request - No webhook body', function (done) {
    this.app
      .post('/webhook')
      .set('Content-Type', 'application/json')
      .set('x-paystack-signature', testData.mockPaystackService())
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return a 200 - req body matches encoded header', function (done) {
    this.app
      .post('/webhook')
      .set('Content-Type', 'application/json')
      .set('x-paystack-signature', testData.mockPaystackService())
      .send(testData.sampleWebhookResponse)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  after(function () {
    this.app.close();
  });
});
