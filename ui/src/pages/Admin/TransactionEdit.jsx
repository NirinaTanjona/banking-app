import { useState, useEffect } from 'react';
import {  Grid, Typography, TextField, Button} from '@mui/material';
import { network, logger } from '../../utils'
import { useParams } from 'react-router-dom'

export const TransactionEdit = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    id: '',
    amount: '',
    transaction_type: '',
    sender: '',
    receiver: '',
    created: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    try {
        await network.PATCH(`/admin/transactions/${id}/`, formData).then(response => {
            console.log(response.data)
        })
      } catch(e) {
        logger.error('Error fetching data', e)
      }
  };

  useEffect(() => {
    try {
        network.GET(`/admin/transactions/${id}/`).then(response => {
            setFormData((prevFormData) => ({
                ...prevFormData,
                id: response.data.id,
                amount: response.data.amount,
                transaction_type: response.data.transaction_type,
                sender: response.data.sender,
                receiver: response.data.receiver,
                created: response.data.created
            }))
        })
      } catch(e) {
        logger.error('Error fetching data', e)
      }
}, [id])

  return (
    <Grid container justifyContent="center">

        <Grid item xs={12} sm={8} md={6} lg={4}>
            <Typography variant="h4" gutterBottom>
                Transaction Edit
            </Typography>
            <TextField
                name="id"
                label="ID"
                value={formData.id}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
            />
            <TextField
                name="amount"
                label="Amount"
                value={formData.amount}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
            />
            <TextField
                name="transaction_type"
                label="Transaction Type"
                value={formData.transaction_type}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
            />
            <TextField
                name="sender"
                label="Sender"
                value={formData.sender}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
            />
            <TextField
                name="receiver"
                label="Receiver"
                value={formData.receiver}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
            />
            <TextField
                name="created"
                label="Created"
                value={formData.created}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
            />
            <Button onClick={() => handleUpdate()} type="submit" variant="contained" color="primary">
                Update
            </Button>
        </Grid>
    </Grid>
  );
};
