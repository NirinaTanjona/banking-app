import { useState , useEffect } from 'react'
import { network, logger } from '../../utils'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const UserDashboard = () => {

    const [ data, setData ] = useState([])
    const [ quantity, setQuantity ] = useState()
    const [ receiver, setReceiver ] = useState()

    const handleQuantity = (e) => {
        setQuantity(e.target.value)
    }

    const handleReceiver = (e) => {
        setReceiver(e.target.value)
    }

    const deposit = async () => {
        try {
            await network.PATCH(`/user/deposit/`, {quantity, receiver}).then(response => {
                console.log(response.data)
            })
        } catch(e) {
            logger('error', e)
        }

    }

    useEffect(() => {
    try {
        network.GET(`/user/getUserData/`).then(response => {
            setData(response.data)
        })
        } catch (e) {
        logger.error('Error fetching Summaries', e)
        }
    }, [])
    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Box>
                <TextField
                    label='quantity'
                    type='number'
                    value={quantity}
                    onChange={handleQuantity}
                    required
                />
                <TextField
                    label='receiver'
                    value={receiver}
                    onChange={handleReceiver}
                />
                <Button onCick={deposit}>Deposit</Button>
            </Box>
        </div>)

}

export default UserDashboard