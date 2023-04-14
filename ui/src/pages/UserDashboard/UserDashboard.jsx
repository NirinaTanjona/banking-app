import { useState , useEffect } from 'react'
import { network, logger } from '../../utils'
import Box from '@mui/material/Box'

const UserDashboard = () => {

    const [ data, setData ] = useState([])

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

            </Box>
        </div>)

}

export default UserDashboard