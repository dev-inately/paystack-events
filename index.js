const { EventEmitter } = require('events');
const util = require('util');
const crypto = require('crypto');

function PaystackEvents(key) {
  if (!key) throw new Error('You must supply your `Paystack` API key!');

  this._apikey = key;

  if (!(this instanceof PaystackEvents)) {
    return new PaystackEvents(key);
  }
}

PaystackEvents.prototype.webhook = function () {
  const self = this;
  return function (req, res, next) {
    const paystackHeader = req.headers['x-paystack-signature'];
    // If the header is empty or request body is empty, then it is not a valid webhook
    if (!paystackHeader || !Object.keys(req.body).length) {
      return res.sendStatus(400);
    }
    const hash = crypto.createHmac('sha512', self._apikey).update(JSON.stringify(req.body)).digest('hex');
    if (hash === paystackHeader) {
      self.emit(req.body.event, req.body);
    }
    return res.sendStatus(200);
  };
};

util.inherits(PaystackEvents, EventEmitter);

module.exports = PaystackEvents;
