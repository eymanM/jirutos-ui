import axios from 'axios';
import { URL } from 'state/constans/constans';
import { getTokens, saveTokens } from 'services/AuthenticationService';
import { TokensType } from 'interfaces&Types/SimpleTypes';

const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.request.use(
  (config: any) => {
    const token = getTokens()?.idToken;
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    //if (!originalConfig) return instance(originalConfig);

    //if (originalConfig.url.includes('/User/SignIn')) return instance(originalConfig);

    if (err.response && !originalConfig._retry) {
      originalConfig._retry = true;

      if (err.response.data?.detail === 'Invalid Refresh Token') window.location.href = '/Sign/in';

      if (err.response.status === 401)
        try {
          const email = localStorage.getItem('email');
          const refreshToken = getTokens()?.refreshToken;
          const rs = await instance.get(`/User/RenewTokens/${email}/${refreshToken}`);

          saveTokens(rs.data as TokensType);
          return instance(originalConfig);
        } catch (_error) {
          window.location.href = '/Sign/in';
          return Promise.reject(_error);
        }
    }

    return Promise.reject(err);
  },
);

export default instance;
