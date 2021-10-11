export const MOCKED_WALLET_BALANCES_ZERO = {
  items: [
    { asset: 'USD', 'available': '0', 'trading': '0' },
    { asset: 'EUR', 'available': '0', 'trading': '0' }
  ]
};

export const MOCKED_WALLET_BALANCES_WITH_MONEY = {
  items: [
    { asset: 'USD', 'available': '62450', 'trading': '17845' },
    { asset: 'BTC', 'available': '.6124', 'trading': '0.497' },
    { asset: 'ETH', 'available': '13.4', 'trading': '3.9' },
    { asset: 'LTC', 'available': '28', 'trading': '3' }
  ]
};

export const MOCKED_TICKER = {
  market: 'BTCUSD',
  last_execution: {
    price: '231.92'
  },
  snapshot_at: '2021-02-19T13:06:15.299Z'
};

export const MOCKED_TOKEN_DATA = {
  access_token: 'asdfasdfasdfsadfasdfas.wboX9Ce2pO5kbwahF8KkauoWNwxc71z_kN3dhKeY68I',
  expires_in: 3599,
  scope: 'kyc:read_customer_status funding:read_profile',
  token_type: 'bearer'
};

export const MOCKED_ORDER_HISTORY = {
  total_count: 61,
  items: [
    {
      id: '63701a', market: 'BTCUSD', side: 'BUY', base_amount: '0.0273', amount_filled: '0.0150', price: '21234.95',
      status: 'OPEN', metadata: { multi_order_id: '71a940' },
      modified_at: '2021-04-20T13:06:15.299Z'
    },
    {
      id: '58302a', market: 'ETHUSD', side: 'BUY', base_amount: '0.0812', price: '8300.95',
      status: 'FILLED', modified_at: '2021-04-19T03:06:15.299Z'
    },
    {
      id: '94503a', market: 'BTCUSD', side: 'SELL', base_amount: '0.018', amount_filled: '0.0050', price: '91234.95',
      status: 'OPEN', metadata: { multi_order_id: '168326' },
      modified_at: '2021-04-19T13:06:15.299Z'
    },
    {
      id: '6a984a', market: 'BTCUSD', side: 'SELL', base_amount: '0.0134', price: '88300.95',
      status: 'OPEN', metadata: { multi_order_id: '168326' },
      modified_at: '2021-04-19T13:06:14.299Z'
    },
    {
      id: '108675a', market: 'ETHUSD', side: 'BUY', base_amount: '0.2', amount_filled: '0.0020', price: '2831.95',
      status: 'OPEN', metadata: { multi_order_id: '172956', multi_order_name: 'Batch1' },
      modified_at: '2021-04-18T21:23:13.299Z'
    },
    {
      id: '645676a', market: 'ETHUSD', side: 'BUY', base_amount: '0.3', amount_filled: '0.0030', price: '2811.95',
      status: 'OPEN', metadata: { multi_order_id: '172956', multi_order_name: 'Batch1' },
      modified_at: '2021-04-18T21:23:12.299Z'
    },
    {
      id: '617087a', market: 'ETHUSD', side: 'BUY', base_amount: '0.003', price: '2780.95',
      status: 'OPEN', metadata: { multi_order_id: '172956', multi_order_name: 'Batch1' },
      modified_at: '2021-04-18T21:23:11.299Z'
    },
    {
      id: '61aa78a', market: 'ETHUSD', side: 'BUY', base_amount: '0.03', price: '2980.95',
      status: 'OPEN', metadata: { multi_order_id: '18203c' },
      modified_at: '2021-04-17T14:15:54.299Z'
    },
    {
      id: '11b679a', market: 'ETHUSD', side: 'BUY', base_amount: '0.3', price: '2890.95',
      status: 'OPEN', metadata: { multi_order_id: '18203c' },
      modified_at: '2021-04-17T14:15:54.299Z'
    },
    {
      id: '1296710a', market: 'ETHUSD', side: 'BUY', base_amount: '0.0453', price: '2778.95',
      status: 'OPEN', metadata: { multi_order_id: '18203c' },
      modified_at: '2021-04-17T14:15:54.299Z'
    },
    {
      id: '670b711a', market: 'ETHUSD', side: 'BUY', base_amount: '0.0766', price: '2797.95',
      status: 'OPEN', metadata: { multi_order_id: '198a48'},
      modified_at: '2021-04-16T16:19:22.299Z'
    },
    {
      id: '91b6712a', market: 'ETHUSD', side: 'BUY', base_amount: '.34', price: '2801.95',
      status: 'OPEN', metadata: { multi_order_id: '198a48'},
      modified_at: '2021-04-16T16:19:21.299Z'
    },
    {
      id: '615612ea', market: 'ETHUSD', side: 'BUY', base_amount: '.1546', price: '2909.95',
      status: 'OPEN', metadata: { multi_order_id: '198a48'},
      modified_at: '2021-04-16T16:19:21.299Z'
    },
    {
      id: '6156704a', market: 'ETHUSD', side: 'BUY', base_amount: '0.1264', price: '2908.95',
      status: 'OPEN', metadata: { multi_order_id: '198a50'},
      modified_at: '2021-04-15T13:11:17.299Z'
    },
    {
      id: '9a16715a', market: 'ETHUSD', side: 'BUY', base_amount: '0.311', price: '2991.95',
      status: 'OPEN', metadata: { multi_order_id: '198a50'},
      modified_at: '2021-04-15T13:11:16.299Z'
    },
    {
      id: '6856716a', market: 'ETHUSD', side: 'BUY', base_amount: '.02', price: '2773.95',
      status: 'OPEN', metadata: { multi_order_id: '198a50'},
      modified_at: '2021-04-15T13:11:15.299Z'
    },
    {
      id: '6459c17a', market: 'ETHUSD', side: 'BUY', base_amount: '0.3', price: '2813.95',
      status: 'OPEN', metadata: { multi_order_id: '198a51'},
      modified_at: '2021-04-15T01:03:14.299Z'
    },
    {
      id: '6456718a', market: 'ETHUSD', side: 'BUY', base_amount: '0.003', price: '2865.95',
      status: 'OPEN', metadata: { multi_order_id: '198a51'},
      modified_at: '2021-04-15T01:03:15.299Z'
    },
    {
      id: '9011719a', market: 'ETHUSD', side: 'BUY', base_amount: '0.05', price: '2875.95',
      status: 'OPEN', metadata: { multi_order_id: '198a51'},
      modified_at: '2021-04-15T01:03:15.299Z'
    },
    {
      id: '6781720a', market: 'ETHUSD', side: 'BUY', base_amount: '0.06', price: '2909.95',
      status: 'OPEN', metadata: { multi_order_id: '198a50'},
      modified_at: '2021-04-13T21:00:15.299Z'
    },
    {
      id: '6126721a', market: 'ETHUSD', side: 'SELL', base_amount: '.15', price: '3821.95',
      status: 'OPEN', metadata: { multi_order_id: '198a52'},
      modified_at: '2021-04-11T21:09:15.299Z'
    },
    {
      id: '90b1722a', market: 'ETHUSD', side: 'SELL', base_amount: '.13', price: '3854.95',
      status: 'OPEN', metadata: { multi_order_id: '198a52'},
      modified_at: '2021-04-11T21:09:15.299Z'
    },
    {
      id: '6156023a', market: 'ETHUSD', side: 'SELL', base_amount: '0.13', price: '3371.95',
      status: 'OPEN', metadata: { multi_order_id: '198a55'},
      modified_at: '2021-04-10T20:39:15.299Z'
    },
    {
      id: '61567569', market: 'ETHUSD', side: 'SELL', base_amount: '.23', price: '3866.95',
      status: 'OPEN', metadata: { multi_order_id: '198a55'},
      modified_at: '2021-04-10T20:39:15.299Z'
    },
    {
      id: '6a01725a', market: 'ETHUSD', side: 'SELL', base_amount: '0.2', price: '3712.95',
      status: 'OPEN', metadata: { multi_order_id: '198a55'},
      modified_at: '2021-04-10T20:39:15.299Z'
    },
    {
      id: '4570126a', market: 'ETHUSD', side: 'SELL', base_amount: '0.13', price: '3890.95',
      status: 'OPEN', metadata: { multi_order_id: '198a55'},
      modified_at: '2021-04-10T20:39:15.299Z'
    },
    {
      id: '6680126a', market: 'ETHUSD', side: 'SELL', base_amount: '0.15', price: '4012.95',
      status: 'OPEN', metadata: { multi_order_id: '201b79'},
      modified_at: '2021-04-08T19:06:15.299Z'
    },
    {
      id: '587712e8', market: 'ETHUSD', side: 'SELL', base_amount: '0.16', price: '4112.95',
      status: 'OPEN', metadata: { multi_order_id: '201b79'},
      modified_at: '2021-04-08T19:06:14.299Z'
    },
    {
      id: '90a012c4', market: 'ETHUSD', side: 'SELL', base_amount: '0.25', price: '4113.95',
      status: 'OPEN', metadata: { multi_order_id: '201b79'},
      modified_at: '2021-04-08T19:06:13.299Z'
    },
    {
      id: '78541221', market: 'ETHUSD', side: 'SELL', base_amount: '0.15', price: '4212.95',
      status: 'OPEN', metadata: { multi_order_id: '201b79'},
      modified_at: '2021-04-08T19:06:12.299Z'
    },
    {
      id: '66561255', market: 'ETHUSD', side: 'SELL', base_amount: '0.11', price: '4213.95',
      status: 'OPEN', metadata: { multi_order_id: '201b79'},
      modified_at: '2021-04-08T19:06:11.299Z'
    },
    {
      id: '9b401a1a', market: 'ETHUSD', side: 'SELL', base_amount: '0.09', price: '4314.95',
      status: 'OPEN', metadata: { multi_order_id: '81a095'},
      modified_at: '2021-04-07T15:44:10.299Z'
    },
    {
      id: '6678a298', market: 'ETHUSD', side: 'SELL', base_amount: '0.12', price: '4415.95',
      status: 'OPEN', metadata: { multi_order_id: '81a095'},
      modified_at: '2021-04-07T15:44:09.299Z'
    },
    {
      id: '66798a1c', market: 'ETHUSD', side: 'SELL', base_amount: '0.06', price: '4512.95',
      status: 'OPEN', metadata: { multi_order_id: '81a095'},
      modified_at: '2021-04-07T15:44:08.299Z'
    },
    {
      id: '6a011209', market: 'ETHUSD', side: 'SELL', base_amount: '0.08', price: '4512.95',
      status: 'OPEN', metadata: { multi_order_id: '81a095'},
      modified_at: '2021-04-07T15:44:07.299Z'
    },
    {
      id: '3470127c', market: 'ETHUSD', side: 'SELL', base_amount: '0.18', price: '4513.95',
      status: 'OPEN', metadata: { multi_order_id: '81a095'},
      modified_at: '2021-04-07T15:44:06.299Z'
    },
    {
      id: '102412a2', market: 'ETHUSD', side: 'SELL', base_amount: '0.25', price: '4512.95',
      status: 'OPEN', metadata: { multi_order_id: '81a095'},
      modified_at: '2021-04-07T15:44:05.299Z'
    },
    {
      id: '90811277', market: 'ETHUSD', side: 'SELL', base_amount: '0.16', price: '4612.95',
      status: 'OPEN', metadata: { multi_order_id: '81a095'},
      modified_at: '2021-04-07T15:44:04.299Z'
    },
    {
      id: '7870145c', market: 'ETHUSD', side: 'SELL', base_amount: '0.17', price: '4612.95',
      status: 'OPEN', metadata: { multi_order_id: '1a0c46'},
      modified_at: '2021-04-06T19:09:03.299Z'
    },
    {
      id: '690015a4', market: 'ETHUSD', side: 'SELL', base_amount: '0.18', price: '4612.95',
      status: 'OPEN', metadata: { multi_order_id: '1a0c46'},
      modified_at: '2021-04-06T19:09:02.299Z'
    },
    {
      id: '6909126c', market: 'ETHUSD', side: 'SELL', base_amount: '0.182', price: '4612.95',
      status: 'OPEN', metadata: { multi_order_id: '1a0c46'},
      modified_at: '2021-04-06T19:09:01.299Z'
    },
    {
      id: '5770127a', market: 'ETHUSD', side: 'SELL', base_amount: '0.184', price: '4712.95',
      status: 'OPEN', metadata: { multi_order_id: '1a0c46'},
      modified_at: '2021-04-06T19:09:00.299Z'
    },
    {
      id: '52401212', market: 'ETHUSD', side: 'SELL', base_amount: '0.19', price: '4712.95',
      status: 'OPEN', metadata: { multi_order_id: '1a0c46'},
      modified_at: '2021-04-06T19:09:59.299Z'
    },
    {
      id: '40901290', market: 'ETHUSD', side: 'SELL', base_amount: '0.2', price: '4712.95',
      status: 'OPEN', metadata: { multi_order_id: '1a0c46'},
      modified_at: '2021-04-06T19:09:58.299Z'
    },
    {
      id: '12101a4b', market: 'ETHUSD', side: 'SELL', base_amount: '0.2', price: '4712.95',
      status: 'OPEN', metadata: { multi_order_id: '1a0c46'},
      modified_at: '2021-04-06T19:09:57.299Z'
    },
    {
      id: '8080126a', market: 'ETHUSD', side: 'SELL', base_amount: '0.21', price: '4712.95',
      status: 'OPEN', metadata: { multi_order_id: '1a0c46'},
      modified_at: '2021-04-06T19:09:56.299Z'
    },
    {
      id: '5101278', market: 'ETHUSD', side: 'SELL', base_amount: '0.21', price: '4812.95',
      status: 'OPEN', metadata: { multi_order_id: '1a0c46'},
      modified_at: '2021-04-06T19:09:55.299Z'
    },
    {
      id: '20301ac1', market: 'ETHUSD', side: 'SELL', base_amount: '0.21', price: '4812.95',
      status: 'OPEN', metadata: { multi_order_id: '1a0c46'},
      modified_at: '2021-04-06T19:09:54.299Z'
    },
    {
      id: '88101299', market: 'ETHUSD', side: 'SELL', base_amount: '0.22', price: '4812.95',
      status: 'OPEN', metadata: { multi_order_id: '1a0c46'},
      modified_at: '2021-04-06T19:09:53.299Z'
    },
    {
      id: '7030128f', market: 'ETHUSD', side: 'SELL', base_amount: '0.23', price: '4812.95',
      status: 'OPEN', metadata: { multi_order_id: '910a37'},
      modified_at: '2021-04-05T19:05:52.299Z'
    },
    {
      id: '658012f7', market: 'ETHUSD', side: 'SELL', base_amount: '0.24', price: '4812.95',
      status: 'OPEN', metadata: { multi_order_id: '910a37'},
      modified_at: '2021-04-05T19:05:51.299Z'
    },
    {
      id: '6670126a', market: 'ETHUSD', side: 'SELL', base_amount: '0.24', price: '4812.95',
      status: 'OPEN', metadata: { multi_order_id: '910a37'},
      modified_at: '2021-04-05T19:05:50.299Z'
    },
    {
      id: '2310123c', market: 'ETHUSD', side: 'SELL', base_amount: '0.25', price: '4912.95',
      status: 'OPEN', metadata: { multi_order_id: '910a37'},
      modified_at: '2021-04-05T19:05:49.299Z'
    },
    {
      id: '201012a2', market: 'ETHUSD', side: 'SELL', base_amount: '0.25', price: '4912.95',
      status: 'OPEN', metadata: { multi_order_id: '910a37'},
      modified_at: '2021-04-05T19:05:48.299Z'
    },
    {
      id: '547012c9', market: 'ETHUSD', side: 'SELL', base_amount: '0.26', price: '4912.95',
      status: 'OPEN', metadata: { multi_order_id: '910a37'},
      modified_at: '2021-04-05T19:05:47.299Z'
    },
    {
      id: '2370126b', market: 'ETHUSD', side: 'SELL', base_amount: '0.26', price: '4912.95',
      status: 'OPEN', metadata: { multi_order_id: '910a37'},
      modified_at: '2021-04-05T19:05:46.299Z'
    },
    {
      id: '1a56727a', market: 'LTCUSD', side: 'BUY', base_amount: '0.13', price: '80.95',
      status: 'OPEN', metadata: { multi_order_id: '198a64'},
      modified_at: '2021-04-02T05:34:15.299Z'
    },
    {
      id: '6109a28a', market: 'LTCUSD', side: 'BUY', base_amount: '0.8', price: '70.95',
      status: 'OPEN', metadata: { multi_order_id: '198a64'},
      modified_at: '2021-04-02T18:23:15.299Z'
    },
    {
      id: '0856729a', market: 'LTCUSD', side: 'SELL', base_amount: '.34', price: '811.95',
      status: 'OPEN', modified_at: '2021-04-02T15:43:15.299Z'
    },
    {
      id: '6156730a', market: 'LTCUSD', side: 'SELL', base_amount: '.13', price: '809.95',
      status: 'OPEN', modified_at: '2021-04-02T14:02:15.299Z'
    },
    {
      id: '6090931a', market: 'LTCUSD', side: 'SELL', base_amount: '0.3', price: '835.95',
      status: 'OPEN', modified_at: '2021-04-02T20:12:15.299Z'
    }
  ]
};

export const MOCKED_EXECUTIONS = {
  total_count: 48,
  items: [
    {
      execution_id: '8728716',
      order_id: 'ab6f86f0-54c0-4b7d-8607-caa4f2ae4319',
      executed_at: '2021-03-01T05:58:08.962Z',
      market: 'BCHUSD', side: 'BUY', amount: '0.1', price: '2898.95',
      commission: '1.0146325', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728715',
      order_id: 'bb6f86f0-54c0-4b7d-8607-caa4f21c78f6',
      executed_at: '2021-02-28T05:58:08.950Z',
      market: 'BTCUSD', side: 'BUY', amount: '0.1', price: '1738.95',
      commission: '0.6086325', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728714',
      order_id: 'cb6f86f0-54c0-4b7d-8607-caa4f2ae431c',
      executed_at: '2021-02-27T05:58:08.937Z',
      market: 'BTCUSD', side: 'BUY', amount: '0.1', price: '1448.95',
      commission: '0.5071325', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728713',
      order_id: 'cb6f86f0-54c0-4b7d-8607-caa4f2ae431c',
      executed_at: '2021-02-27T05:58:08.937Z',
      market: 'BTCUSD', side: 'BUY', amount: '0.123', price: '1448.95',
      commission: '0.62', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728712',
      order_id: 'cb6f86f0-54c0-4b7d-8607-caa4f2ae431c',
      executed_at: '2021-02-27T05:58:08.937Z',
      market: 'BTCUSD', side: 'BUY', amount: '0.25', price: '1448.95',
      commission: '1.43', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728711',
      order_id: 'cb6f86f0-54c0-4b7d-8607-caa4f2ae431c',
      executed_at: '2021-02-27T05:58:08.937Z',
      market: 'BTCUSD', side: 'BUY', amount: '0.078', price: '1448.95',
      commission: '0.40', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728710',
      order_id: 'db6f86f0-54c0-4b7d-8607-f7a4f2c3ab98',
      executed_at: '2021-02-26T05:58:08.937Z',
      market: 'BTCUSD', side: 'BUY', amount: '0.1', price: '1423.95',
      commission: '0.6071325', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728709',
      order_id: 'db6f86f0-54c0-4b7d-8607-f7a4f2c3ab98',
      executed_at: '2021-02-26T05:58:08.937Z',
      market: 'BTCUSD', side: 'BUY', amount: '0.1', price: '1423.95',
      commission: '0.65', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728708',
      order_id: 'db6f86f0-54c0-4b7d-8607-f7a4f2c3ab98',
      executed_at: '2021-02-26T05:58:08.937Z',
      market: 'BTCUSD', side: 'BUY', amount: '0.34', price: '1423.95',
      commission: '1.9071325', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728707',
      order_id: 'db6f86f0-54c0-4b7d-8607-f7a4f2c3ab98',
      executed_at: '2021-02-26T05:58:08.937Z',
      market: 'BTCUSD', side: 'BUY', amount: '0.41', price: '1423.95',
      commission: '2.5071325', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728706',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c43',
      executed_at: '2021-02-23T05:58:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.33560086', price: '1260.0',
      commission: '1.0576', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728705',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c43',
      executed_at: '2021-02-23T05:57:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.2360086', price: '1260.0',
      commission: '.75', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728704',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c43',
      executed_at: '2021-02-23T05:56:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '0.23560086', price: '1260.0',
      commission: '.75376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728703',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c43',
      executed_at: '2021-02-23T05:54:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.2356086', price: '1260.0',
      commission: '.575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728702',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c43',
      executed_at: '2021-02-23T05:53:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.13560086', price: '1260.0',
      commission: '.5575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728701',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c43',
      executed_at: '2021-02-23T05:52:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.73560086', price: '1260.0',
      commission: '3.4057376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728700',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c43',
      executed_at: '2021-02-23T05:51:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.53560086', price: '1260.0',
      commission: '1.4575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728699',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c43',
      executed_at: '2021-02-23T05:50:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.83560086', price: '1260.0',
      commission: '3.60575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728698',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c44',
      executed_at: '2021-02-20T05:49:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.13560086', price: '1217.0',
      commission: '.75376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728697',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c44',
      executed_at: '2021-02-20T05:48:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.460086', price: '1217.0',
      commission: '.4575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728696',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c44',
      executed_at: '2021-02-20T05:47:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.37560086', price: '1217.0',
      commission: '.40575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728695',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c45',
      executed_at: '2021-02-17T05:46:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.21560086', price: '1189.0',
      commission: '.4075376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728694',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c45',
      executed_at: '2021-02-17T05:45:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.53560086', price: '1189.0',
      commission: '.605376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728693',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c45',
      executed_at: '2021-02-17T05:44:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.63560086', price: '1189.0',
      commission: '.685376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728692',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c45',
      executed_at: '2021-02-17T05:43:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.73560086', price: '1189.0',
      commission: '.875376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728690',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c45',
      executed_at: '2021-02-17T05:42:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.83560086', price: '1189.0',
      commission: '1.2057376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728890',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c45',
      executed_at: '2021-02-17T05:41:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.12360086', price: '1189.0',
      commission: '0.30575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728889',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c45',
      executed_at: '2021-02-17T05:40:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.12560086', price: '1189.0',
      commission: '.35', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728888',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c45',
      executed_at: '2021-02-17T05:39:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.1236560086', price: '1189.0',
      commission: '.34', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728887',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c45',
      executed_at: '2021-02-17T05:38:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.1723560086', price: '1189.0',
      commission: '.4475376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728886',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c46',
      executed_at: '2021-02-11T05:37:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.273560086', price: '960.0',
      commission: '.4055376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728885',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c46',
      executed_at: '2021-02-11T05:36:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.29560086', price: '960.0',
      commission: '.4575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728884',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c46',
      executed_at: '2021-02-11T05:35:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.42360086', price: '960.0',
      commission: '.6075376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728883',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c46',
      executed_at: '2021-02-11T05:34:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.47230086', price: '960.0',
      commission: '.6575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728882',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c46',
      executed_at: '2021-02-11T05:33:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.47350086', price: '960.0',
      commission: '.65', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728881',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c46',
      executed_at: '2021-02-11T05:32:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.40860086', price: '960.0',
      commission: '.50575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728880',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c47',
      executed_at: '2021-02-04T05:31:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.51170086', price: '935.0',
      commission: '1.40575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728879',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c47',
      executed_at: '2021-02-04T05:30:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.81230086', price: '935.0',
      commission: '2.40575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728878',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c47',
      executed_at: '2021-02-04T05:29:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.03560086', price: '935.0',
      commission: '.06', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728877',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c47',
      executed_at: '2021-02-04T05:28:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.89560086', price: '935.0',
      commission: '2.30575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728876',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c47',
      executed_at: '2021-02-04T05:27:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '.77560086', price: '935.0',
      commission: '2.140376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '7728875',
      order_id: 'db6f86f0-54c0-4b7d-8607-aa4f2c2c47',
      executed_at: '2021-02-04T05:26:08.925Z',
      market: 'BTCUSD', side: 'SELL', amount: '3.66560086', price: '935.0',
      commission: '5.40575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728704',
      order_id: 'db6f86f0-54c0-4b7d-8607-caa4f2ae431a',
      executed_at: '2021-02-03T05:58:08.925Z',
      market: 'ETHUSD', side: 'BUY', amount: '3.23560086', price: '1190.0',
      commission: '5.205776', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728703',
      order_id: 'db6f86f0-54c0-4b7d-8607-caa4f2ae431a',
      executed_at: '2021-02-03T05:58:08.925Z',
      market: 'ETHUSD', side: 'BUY', amount: '1.13560086', price: '1190.0',
      commission: '1.5376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728702',
      order_id: 'db6f86f0-54c0-4b7d-8607-caa4f2a98b4',
      executed_at: '2021-02-02T05:58:08.925Z',
      market: 'ETHUSD', side: 'SELL', amount: '1.2560086', price: '1950.0',
      commission: '3.40575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728701',
      order_id: 'db6f86f0-54c0-4b7d-8607-caa4f2a98b4',
      executed_at: '2021-02-02T05:58:08.925Z',
      market: 'ETHUSD', side: 'SELL', amount: '1.23560086', price: '1950.0',
      commission: '3.205376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728700',
      order_id: 'db6f86f0-54c0-4b7d-8607-caa4f2637abc',
      executed_at: '2021-02-01T05:58:08.925Z',
      market: 'LTCUSD', side: 'BUY', amount: '6.23560086', price: '257.0',
      commission: '2.40575376', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
    {
      execution_id: '8728699',
      order_id: 'db6f86f0-54c0-4b7d-8607-caa4f2637abc',
      executed_at: '2021-02-01T05:58:08.925Z',
      market: 'LTCUSD', side: 'SELL', amount: '5.5606', price: '257.0',
      commission: '2.05', commission_asset: 'USD', rebate: '0.0', rebate_asset: 'USD'
    },
  ]
};
