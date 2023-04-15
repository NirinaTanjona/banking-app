import { useState, useEffect } from 'react'
import { network, logger } from '../../utils'



const AdminDashboard = () => {

    const [users, setUsers] = useState([])
    const [transactions, setTransactions] = useState([])

    const getUsers = async () => {
        try {
            await network.GET(`/admin/users/`).then(response => {
                setUsers(response.data)
            })
          } catch (e) {
            logger.error("Error sign in", e)
        }
    }

    const getTransactions = async () => {
        try {
            await network.GET(`/admin/transactions/`).then(response => {
                setTransactions(response.data)
            })
          } catch (e) {
            logger.error("Error sign in", e)
        }
    }



    useEffect(() => {
        getUsers()
        getTransactions()
    }, [])


    return (
        <div>
            <h1>Users</h1>
            <pre>{JSON.stringify(users, null, 2)}</pre>
            <br></br>
            <h1>Transaction</h1>
            <pre>{JSON.stringify(transactions, null, 2)}</pre>
        </div>
    )
}

export default AdminDashboard