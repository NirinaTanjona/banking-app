import { useState , useEffect } from 'react'
import { network, logger } from '../../utils'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const UserDashboard = () => {

    const [ data, setData ] = useState([])
    const [ quantity, setQuantity ] = useState("")
    const [ receiver, setReceiver ] = useState("")

    const handleQuantity = (e) => {
        setQuantity(e.target.value)
    }

    const handleReceiver = (e) => {
        setReceiver(e.target.value)
    }

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
        console.log('')
        try {
            await network.POST(`/user/${data.id}}/deposit/`, {quantity, receiver}).then(response => {
                console.log(response.data)
                setQuantity("")
                setReceiver("")
                getUserData()
            })
        } catch(e) {
            logger('error', e)
        }
    }

    useEffect(() => {
        getUserData()
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
                <Button onClick={deposit}>Deposit</Button>
            </Box>
        </div>)

}

export default UserDashboard