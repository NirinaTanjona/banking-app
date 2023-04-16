import { useState, useEffect } from 'react'
import { network, auth, logger } from '../../utils'
import { TextField, Button, Grid } from '@mui/material'
import './SignIn.css'

function SignIn() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSuperuser, setIsSuperuser] = useState(false)

  const handleSubmit = async () => {
    try {
      await network.POST_USER(`/sign-in/`, { username, password }).then(response => {
        auth.setAuth(response.data.token)
      }).then(() => {
        // window.location.href = '/UserDashboard/'
        getAuthorization()
      })
    } catch (e) {
      logger.error("Error sign in", e)
    }
  }

  const getAuthorization = async () => {
    try {
      await network.GET(`/user/getUserData/`).then(response => {
        setIsSuperuser(response.data.is_staff)
      }).then(response => {
        if (isSuperuser) {
          console.log("isSuperuser:", isSuperuser)
          window.location.href = '/admin/'
        } else {
          window.location.href = '/userDashboard/'
        }
      })
    } catch (e) {
      logger.error('Error fetching Summaries', e)
    }
  }



  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
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
              Login
            </Button>
          </Grid>
        </Grid>
  )
}

export default SignIn