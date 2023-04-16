import { useState } from 'react'
import { network, logger } from '../../utils'
import { Container, Grid, Paper, Typography, Button, TextField} from '@mui/material';


function SignUp() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    try {
      await network.POST_USER(`/sign-up/`, { username, password }).then(response => {
        window.location.href = '/'
      })
    } catch (e) {
      logger.error("Error in registration", e)
    }
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
  };


  const handlePassword = (event) => {
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
              Register
            </Typography>
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
      </Grid>
    </Container>
  )
}

export default SignUp