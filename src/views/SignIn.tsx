import * as React from 'react';
import { Avatar, Button, TextField, Typography, Container, Box, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { URL, LoginErrorMessage } from 'state/constans/constans';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC<any> = (props) => {
  const [ , setCookie] = useCookies(['userId', 'userEmail', 'userToken']);
  const [isLoginError, setLoginError] = React.useState(false);
  let navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    axios
      .get(`${URL}/Authentication/BasicAuth`, {
        headers: {
          Email: `${data.get('email')}`,
          ApiToken: `${data.get('token')}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setCookie('userId', `${res.data}`, {
          path: '/',
          maxAge: 1000000,
          sameSite: 'none',
          secure: true,
        });

        setCookie('userEmail', `${data.get('email')}`, {
          path: '/',
          maxAge: 1000000,
          sameSite: 'none',
          secure: true,
        });

        setCookie('userToken', `${data.get('token')}`, {
          path: '/',
          maxAge: 1000000,
          sameSite: 'none',
          secure: true,
        });

        navigate('/');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setLoginError(true);
        } else {
          console.log(err);
        }
      });
  };
  return (
    <Container component='main' maxWidth='xs'>
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
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='token'
            label='Token'
            type='password'
            id='token'
            autoComplete='current-password'
          />
          {isLoginError && (
            <Alert style={{ whiteSpace: 'pre-line' }} variant='outlined' severity='error'>
              {LoginErrorMessage}
            </Alert>
          )}
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
