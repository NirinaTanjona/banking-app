import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { network, logger } from '../../utils'
import { Paper, Typography, Grid } from '@mui/material'

export const UserData = () => {

    const { id } = useParams()
    const [data, setData] = useState({})


    useEffect(() => {
        try {
            network.GET(`/admin/users/${id}/`).then(response => {
                console.log("data: ", response.data)
                setData(response.data)
            })
          } catch(e) {
            logger.error('Error fetching data', e)
          }
    }, [id])

    return (
        <Paper style={{ width: 600, padding: 32, margin: "auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          User Details
        </Typography>
        <Grid container spacing={4} justify="center">
          <Grid item xs={12}>
            <Typography variant="h6">
              <strong>ID: </strong> {data.id}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <strong>Username: </strong> {data.username}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <strong>Balance: </strong>{data.balance}
              {data.transaction_type}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    )
}
