import { useState , useEffect } from 'react'
import { network, logger } from '../../utils'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

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
                console.log("super: ", response.data.is_superuser)
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
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Box>
                <h1>Deposit</h1>
                <TextField
                    label='deposit'
                    type='number'
                    value={depoQuantity}
                    onChange={handleDepoQuantity}
                    required
                />
                <TextField
                    label='receiver'
                    value={depoReceiver}
                    onChange={handleDepoReceiver}
                />
                <Button onClick={deposit}>Deposit</Button>
            </Box>
            <Box>
                <h1>withdraw</h1>
                <TextField
                    label='withdraw'
                    type='number'
                    value={withdrawQuantity}
                    onChange={handleWithdrawal}
                    required
                />
                <Button onClick={withdraw}>Withdraw</Button>
            </Box>
            <Box>
                <h1>Transfert</h1>
                <TextField
                    label='transfert'
                    type='number'
                    value={transfertQuantity}
                    onChange={handleTransfert}
                    required
                />
                <TextField
                    label='receiver'
                    value={transfertReceiver}
                    onChange={handleTransfertReceiver}
                    required
                />
                <Button onClick={transfert}>Transfert</Button>
                <Link to={`/sign-out`}>sign-out</Link>
            </Box>
        </div>)

}

export default UserDashboard