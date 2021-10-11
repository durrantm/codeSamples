import axios from 'axios';
import CryptoTraderApiService from './crypto-trader-api-service';
import { localHost } from '../urls.constant';
jest.mock('axios');

const cryptoTraderAPI = new CryptoTraderApiService();

describe('cryptoTraderAPI service', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetchAuthToken returns a token when successful', async () => {
    axios.get.mockImplementation((url) => ({
      data: {
        access_token: 'validtokenstring'
      },
      config: { url }
    }));
    const tokenStoreSpy = jest.spyOn(Storage.prototype, 'setItem');
    expect(await cryptoTraderAPI.fetchAuthToken()).toEqual({
      token: 'validtokenstring',
      url: `${localHost}/token`
    });
    expect(tokenStoreSpy).toHaveBeenCalledWith('tokenData', 'validtokenstring');
  });

  it('fetchAuthToken handles API errors', async () => {
    axios.get.mockImplementation((url) =>
      Promise.reject({
        response: {
          data: {
            error: {
              detail: 'Request failed with status code 401',
              status: 401
            }
          },
          config: { url }
        }
      })
    );
    await expect(cryptoTraderAPI.fetchAuthToken()).rejects.toEqual(Error('Request failed with status code 401'));
  });
});