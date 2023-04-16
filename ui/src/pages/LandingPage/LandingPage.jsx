import { useState } from 'react'
import { network, auth, logger } from '../../utils'
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Paper, Typography, Button, TextField} from '@mui/material';

const LandingPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [hasError, setError] = useState(false)


    const handleSubmit = async () => {
      try {
        await network.POST_USER(`/sign-in/`, { username, password }).then(response => {
          auth.setAuth(response.data.token)
          auth.setAuthorization(response.data.is_staff)
          if (response.data.is_staff) {
            window.location.href = '/admin/'
          } else {
            window.location.href = '/userDashboard/'
          }
        })
      } catch (e) {
        setError(true)
        logger.error("Error sign in", e)
      }
    }


    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value)
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
    };


  return (
    <Container maxWidth="md">
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h2" component="h1" align="center">
            X Bank
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="p" align="center">
            Welcome to X Bank
          </Typography>
        </Grid>
        <Grid item>
          <Paper variant="outlined" style={{ padding: '16px', width: '100%' }}>
            <Typography sx={{mb: 3}} variant="h6" component="h2" align="center">
              Sign In
            </Typography>
            {hasError && (<Typography sx={{ color: 'red', mb: 3 }} variant="body2" component="h2" align="center">Invalid Username or password.</Typography>)}
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={5}
            >
          <Grid item>
            <TextField
              sx={{width: 390}}
              label="username"
              name="username"
              value={username}
              onChange={handleUsername}
            />
          </Grid>
          <Grid item>
          <TextField
            sx={{width: 390}}
            label="password"
            type='password'
            value={password}
            name="password"
            onChange={handlePassword}
          />
          </Grid>
          <Grid item>
            <Button
              onClick={handleSubmit}
              variant="contained"
            >
              Login
            </Button>
          </Grid>
        </Grid>
          </Paper>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="p" align="center">
            Don't have an account?{' '}
            <Link to="/sign-up">
              <strong>Sign Up</strong>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
