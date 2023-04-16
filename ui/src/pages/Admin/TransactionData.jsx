import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { network, logger } from '../../utils'
import { Paper, Typography, Grid } from '@mui/material'

export const TransactionData = () => {

    const { id } = useParams()
    const [data, setData] = useState({})


    useEffect(() => {
        try {
            network.GET(`/admin/transactions/${id}/`).then(response => {
                setData(response.data)
            })
          } catch(e) {
            logger.error('Error fetching data', e)
          }
    }, [id])

    return (
        <Paper style={{ width: 600, padding: 32, margin: "auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Transaction Details
        </Typography>
        <Grid container spacing={4} justify="center">
          <Grid item xs={12}>
            <Typography variant="h6">
              <strong>ID:</strong> {data.id}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <strong>Amount:</strong> {data.amount}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <strong>Transaction Type:</strong>{" "}
              {data.transaction_type === "D" ? "Debit" : "Credit"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <strong>Sender:</strong> {data.sender}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <strong>Receiver:</strong>{" "}
              {data.receiver ? data.receiver : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <strong>Created:</strong>{" "}
              {new Date(data.created).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    )
}
