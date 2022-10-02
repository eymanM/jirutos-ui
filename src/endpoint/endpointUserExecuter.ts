import { TokensType } from 'interfaces&Types/SimpleTypes';
import axios from './axiosInstance';

export const SignIn = async (email: string, password: string): Promise<TokensType | string> => {
  try {
    const data = await axios.post(`/User/SignIn`, {
      email: email,
      password: password,
    });
    if (data.status === 200) return data.data;

    return data.data.details;
  } catch (err: any) {
    console.log(err);
    return err.response.data.detail;
  }
};

export const SignUp = async (email: string, password: string): Promise<number | string> => {
  try {
    const data = await axios.post(`/User/SignUp`, {
      email: email,
      password: password,
    });
    if (data.status === 200) return data.status;

    return data.data.details;
  } catch (err: any) {
    console.log(err);
    return err.response.data.detail;
  }
};

export const ConfirmCode = async (email: string, code: string): Promise<number | string> => {
  try {
    const data = await axios.get(`/User/ConfirmUserByCode/${email}/${code}`);
    if (data.status === 200) return data.status;

    return data.data.details;
  } catch (err: any) {
    console.log(err);
    return err.response.data.detail;
  }
};

export const RenewTokens = async (email: string, refreshToken: string): Promise<TokensType> => {
  try {
    const data = await axios.get(`/User/RenewTokens/${email}/${refreshToken}`);
    return data.data;
  } catch (err) {
    console.log(err);
    return {} as TokensType;
  }
};
