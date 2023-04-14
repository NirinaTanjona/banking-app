import { useState } from 'react'
import { network, logger } from '../../utils'
import { Grid , TextField, Button } from '@mui/material'


function SignUp() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    try {
      await network.POST_USER(`/sign-up/`, { username, password }).then(response => {
        window.location.href = '/sign-in'
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
    <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    spacing={2}
    sx={{
      height: '100vh',
    }}
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
        Sign-up
      </Button>
    </Grid>
  </Grid>
  )
}

export default SignUp