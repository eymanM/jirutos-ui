import * as React from 'react';
import { Avatar, Button, TextField, Typography, Container, Box, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { URL, LoginErrorMessage } from 'state/constans/constans';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmCode, SignIn, SignUp } from 'endpoint/endpointUserExecuter';
import { saveTokens } from 'services/AuthenticationService';
import { TurnLeft } from '@mui/icons-material';

const Sign: React.FC<any> = (props) => {
  const [isLoginError, setLoginError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(LoginErrorMessage);
  const [showCode, setShowCode] = React.useState(false);
  let { signOption } = useParams();
  let navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (showCode && data.get('code')) {
      const resp = await ConfirmCode(`${data.get('email')}`, `${data.get('code')}`);
      if (typeof resp === 'string') {
        setErrorMessage(resp);
        setLoginError(true);
        return;
      }
      navigate('/Sign/in');
      setShowCode(false);
    }

    switch (signOption) {
      case 'in': {
        const resp = await SignIn(`${data.get('email')}`, `${data.get('password')}`);
        if (typeof resp === 'string') {
          setErrorMessage(resp);
          setLoginError(true);
          return;
        }
        localStorage.setItem('email', `${data.get('email')}`);
        saveTokens(resp);
        navigate('/');
        break;
      }
      case 'up': {
        const resp = await SignUp(`${data.get('email')}`, `${data.get('password')}`);
        if (typeof resp === 'string') {
          setErrorMessage(resp);
          setLoginError(true);
          return;
        }
        setShowCode(true);
        break;
      }
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign {signOption}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {showCode && <TextField margin="normal" required fullWidth name="code" label="Code" type="text" id="code" />}
          {isLoginError && (
            <Alert style={{ whiteSpace: 'pre-line' }} variant="outlined" severity="error">
              {errorMessage}
            </Alert>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Sign;
