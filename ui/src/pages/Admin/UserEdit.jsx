import { useState, useEffect } from 'react';
import {  Grid, Typography, TextField, Button} from '@mui/material';
import { network, logger } from '../../utils'
import { useParams } from 'react-router-dom'

export const UserEdit = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    balance: '',
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
        await network.PATCH(`/admin/users/${id}/`, formData).then(response => {
            console.log(response.data)
        })
      } catch(e) {
        logger.error('Error fetching data', e)
      }
  };

  useEffect(() => {
    try {
        network.GET(`/admin/users/${id}/`).then(response => {
            setFormData((prevFormData) => ({
                ...prevFormData,
                id: response.data.id,
                username: response.data.username,
                balance: response.data.balance
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
                User Edit
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
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
            />
            <TextField
                name="balance"
                label="Balance"
                value={formData.balance}
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
