import { useState , useEffect } from 'react'
import { network, logger } from '../../utils'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { Grid, Typography, Container, AppBar, Toolbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const UserDashboard = () => {

    const [ data, setData ] = useState([])
    const [ depoQuantity, setDepoQuantity ] = useState("")
    const [ depoReceiver, setDepoReceiver ] = useState("")
    const [ withdrawQuantity, setWithdrawQuantity] = useState("")
    const [ transfertQuantity, setTransfertQuantity] = useState("")
    const [ transfertReceiver, setTransfertReceiver] = useState("")


    const columns = [
        { field: 'id', headerName: 'ID', width: 300 },
        { field: 'amount', headerName: 'Amount', width: 75 },
        { field: 'transaction_type', headerName: 'Transaction Type', width: 75 },
        { field: 'receiver', headerName: 'Receiver', width: 300 },
        { field: 'sender', headerName: 'Sender', width: 300 },
        { field: 'created', headerName: 'Creacted', width: 300},
      ];


    const getUserData = () => {
        try {
            network.GET(`/user/getUserData/`).then(response => {
                setData(response.data)
            })
            } catch (e) {
            logger.error('Error fetching Summaries', e)
        }
    }

    const deposit = async () => {
        const depositData = { 'quantity': depoQuantity , 'receiver': depoReceiver}
        try {
            await network.POST(`/user/${data.id}}/deposit/`, depositData).then(response => {
                console.log(response.data)
                setDepoQuantity("")
                setDepoReceiver("")
                getUserData()
            })
        } catch(e) {
            logger('error', e)
        }
    }

    const withdraw = async () => {
        const withdrawData = { 'quantity': withdrawQuantity }
        try {
            await network.POST(`/user/${data.id}}/withdraw/`, withdrawData).then(response => {
                console.log(response.data)
                setWithdrawQuantity("")
                getUserData()
            })
        } catch(e) {
            logger('error', e)
        }
    }

    const transfert = async () => {
        const depositData = { 'quantity': transfertQuantity , 'receiver': transfertReceiver}
        try {
            await network.POST(`/user/${data.id}}/transfer/`, depositData).then(response => {
                console.log(response.data)
                setTransfertQuantity("")
                setTransfertReceiver("")
                getUserData()
            })
        } catch(e) {
            logger('error', e)
        }
    }

    const handleDepoQuantity = (e) => {
        setDepoQuantity(e.target.value)
    }

    const handleDepoReceiver = (e) => {
        setDepoReceiver(e.target.value)
    }

    const handleWithdrawal = (e) => {
        setWithdrawQuantity(e.target.value)
    }

    const handleTransfert = (e) => {
        setTransfertQuantity(e.target.value)
    }

    const handleTransfertReceiver = (e) => {
        setTransfertReceiver(e.target.value)
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {data.username}
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Balance: {data.balance}
            </Typography>
            <Button color="inherit" component={Link} to={`/sign-out`}>
                Logout
            </Button>
            </Toolbar>
        </AppBar>
        <Box>
            <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Deposit
                </Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                <TextField
                    fullWidth
                    label="Deposit Amount"
                    type="number"
                    value={depoQuantity}
                    onChange={handleDepoQuantity}
                    required
                />
                </Grid>
                <Grid item xs={12} sm={5}>
                <TextField
                    fullWidth
                    label="Receiver id"
                    value={depoReceiver}
                    onChange={handleDepoReceiver}
                />
                </Grid>
                <Grid item xs={2}>
                <Button variant="contained" color="primary" onClick={deposit}>
                    Deposit
                </Button>
                </Grid>

                <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Withdraw
                </Typography>
                </Grid>
                <Grid item xs={10}>
                <TextField
                    fullWidth
                    label="Withdraw Amount"
                    type="number"
                    value={withdrawQuantity}
                    onChange={handleWithdrawal}
                    required
                />
                </Grid>
                <Grid item xs={2}>
                <Button variant="contained" color="primary" onClick={withdraw}>
                    Withdraw
                </Button>
                </Grid>

                <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Transfer
                </Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                <TextField
                    fullWidth
                    label="Transfer Amount"
                    type="number"
                    value={transfertQuantity}
                    onChange={handleTransfert}
                    required
                />
                </Grid>
                <Grid item xs={12} sm={5}>
                <TextField
                    fullWidth
                    label="Receiver id"
                    value={transfertReceiver}
                    onChange={handleTransfertReceiver}
                    required
                />
                </Grid>
                <Grid item xs={2}>
                <Button variant="contained" color="primary" onClick={transfert}>
                    Transfer
                </Button>
                </Grid>
            </Grid>
            </Container>
            <Box sx={{ mt: 5, height: 400, width: '100%' }}>
                { data.transactions &&
                    <DataGrid
                        rows={data.transactions}
                        columns={columns}
                        autoPageSize={true}
                        disableRowSelectionOnClick
                    />
                }
            </Box>
        </Box>
        </div>
    )
}

export default UserDashboard