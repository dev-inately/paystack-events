require('dotenv/config');
const express = require('express');
const PaystackEvents = require('..');

const paystackEvents = new PaystackEvents(process.env.PAYSTACK_SECRET_KEY);

const app = express();
app.use(express.json());

app.post('/webhook', log, paystackEvents.webhook());

paystackEvents.on('charge.success', (data) => {
  console.log(data);
});
// user.on('body', (x) => console.log(`Yay ${typeof x}`));
app.listen(3000, () => console.log('App started on port 3000'));
