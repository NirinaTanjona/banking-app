import { useState , useEffect } from 'react'
import { network, logger } from '../../utils'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Typography, Container, AppBar, Toolbar } from '@mui/material';


const UserDashboard = () => {

    const [ data, setData ] = useState([])
    const [ depoQuantity, setDepoQuantity ] = useState("")
    const [ depoReceiver, setDepoReceiver ] = useState("")
    const [ withdrawQuantity, setWithdrawQuantity] = useState("")
    const [ transfertQuantity, setTransfertQuantity] = useState("")
    const [ transfertReceiver, setTransfertReceiver] = useState("")


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
            await network.POST(`/user/${data.id}}/transfert/`, depositData).then(response => {
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
                Dashboard
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
                    label="Receiver"
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
                    label="Receiver"
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
            <TableContainer>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Transaction Type</TableCell>
                    <TableCell>Sender</TableCell>
                    <TableCell>Receiver</TableCell>
                    <TableCell>Created</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data.transactions?.map((row) => (
                    <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.transaction_type}</TableCell>
                    <TableCell>{row.sender}</TableCell>
                    <TableCell>{row.receiver}</TableCell>
                    <TableCell>{row.created}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
        </div>
    )
}

export default UserDashboard