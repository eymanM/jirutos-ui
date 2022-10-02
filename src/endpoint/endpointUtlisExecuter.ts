import axios from './axiosInstance';

export const SpanStrFromMs = async (timeInMs: number): Promise<string> => {
  try {
    const data = await axios.get(`/Utils/SpanStrFromMs/${timeInMs}`);
    return data.data;
  } catch (err) {
    console.log(err);
    return '';
  }
};
