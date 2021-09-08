const crypto = require('crypto');
const nock = require('nock');

const PAYSTACK_SECRET_KEY = 'mock-apikey-for-th!s-test';

const transferSuccessWebbhook = {
  event: 'transfer.success',
  data: {
    amount: 30000,
    currency: 'NGN',
    domain: 'test',
    failures: null,
    id: 37272792,
    integration: {
      id: 463433,
      is_live: true,
      business_name: 'Boom Boom Industries NG',
    },
    reason: 'Have fun...',
    reference: '1jhbs3ozmen0k7y5efmw',
    source: 'balance',
    source_details: null,
    status: 'success',
    titan_code: null,
    transfer_code: 'TRF_wpl1dem4967avzm',
    transferred_at: null,
    recipient: {
      active: true,
      currency: 'NGN',
      description: '',
      domain: 'test',
      email: null,
      id: 8690817,
      integration: 463433,
      metadata: null,
      name: 'Jack Sparrow',
      recipient_code: 'RCP_a8wkxiychzdzfgs',
      type: 'nuban',
      is_deleted: false,
      details: {
        account_number: '0000000000',
        account_name: null,
        bank_code: '011',
        bank_name: 'First Bank of Nigeria',
      },
      created_at: '2020-09-03T12:11:25.000Z',
      updated_at: '2020-09-03T12:11:25.000Z',
    },
    session: { provider: null, id: null },
    created_at: '2020-10-26T12:28:57.000Z',
    updated_at: '2020-10-26T12:28:57.000Z',
  },
};

exports.mockPaystackService = () => crypto.createHmac('sha512', PAYSTACK_SECRET_KEY)
  .update(JSON.stringify(transferSuccessWebbhook))
  .digest('hex');

exports.MOCK_PAYSTACK_SECRET_KEY = PAYSTACK_SECRET_KEY;
exports.sampleWebhookResponse = transferSuccessWebbhook;
