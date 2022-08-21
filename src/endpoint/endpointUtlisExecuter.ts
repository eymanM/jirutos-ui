import axios from 'axios';
import { URL } from 'state/constans/constans';

export const SpanStrFromMs = async (timeInMs: number): Promise<string> => {
  try {
    const data = await axios.get(`${URL}/Utils/SpanStrFromMs/${timeInMs}`);
    return data.data;
  } catch (err) {
    console.log(err);
    return '';
  }
};
