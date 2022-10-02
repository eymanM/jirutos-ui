import { TokensType } from 'interfaces&Types/SimpleTypes';

export const saveTokens = (tokens: TokensType) => {
  localStorage.setItem('tokens', JSON.stringify(tokens));
};

export const getTokens = () => {
  const tokensString = localStorage.getItem('tokens');
  if (!tokensString) return null;
  try {
    const tokens = JSON.parse(tokensString) as TokensType;
    return tokens;
  } catch {
    return null;
  }
};
