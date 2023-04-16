import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { network, logger } from '../../utils'

export const UserData = () => {

    const { id } = useParams()
    const [data, setData] = useState({})


    useEffect(() => {
        try {
            network.GET(`/admin/users/${id}/`).then(response => {
                console.log("data: ", response.data)
                setData(response.data)
            })
          } catch(e) {
            logger.error('Error fetching data', e)
          }
    }, [id])

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
