import { useState , useEffect } from 'react'
import { network, logger } from '../../utils'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const UserDashboard = () => {

    const [ data, setData ] = useState([])
    const [ depoQuantity, setDepoQuantity ] = useState("")
    const [ depoReceiver, setDepoReceiver ] = useState("")
    const [ withdrawQuantity, setWithdrawQuantity] = useState("")


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

    const handleDepoQuantity = (e) => {
        setDepoQuantity(e.target.value)
    }

    const handleDepoReceiver = (e) => {
        setDepoReceiver(e.target.value)
    }

    const handleWithdrawal = (e) => {
        setWithdrawQuantity(e.target.value)
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
                    label='depoQuantity'
                    type='number'
                    value={depoQuantity}
                    onChange={handleDepoQuantity}
                    required
                />
                <TextField
                    label='depoReceiver'
                    value={depoReceiver}
                    onChange={handleDepoReceiver}
                />
                <Button onClick={deposit}>Deposit</Button>
            </Box>
            <Box>
                <h1>withdraw</h1>
                <TextField
                    label='depoQuantity'
                    type='number'
                    value={withdrawQuantity}
                    onChange={handleWithdrawal}
                    required
                />
                <Button onClick={withdraw}>Withdraw</Button>
            </Box>
        </div>)

}

export default UserDashboard