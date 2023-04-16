import { useState, useEffect } from 'react'
import { network, logger } from '../../utils'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'



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

    const deleteUser = async (id) => {
        try {
            await network.DELETE(`/admin/users/${id}/`).then(response => {
                getUsers()
            })
          } catch (e) {
            logger.error("Error on delete user", e)
        }
    }

    const deleteTransaction = async (id) => {
        try {
            await network.DELETE(`/admin/transactions/${id}/`).then(response => {
                getTransactions()
            })
          } catch (e) {
            logger.error("Error on delete user", e)
        }
    }



    useEffect(() => {
        getUsers()
        getTransactions()
    }, [])


    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users?.map((item) => {
                    return (
                    <li key={item.id}>
                        <Link to={`/admin/users/${item.id}/`}>{item.username}</Link>
                        <Link to={`/admin/users/${item.id}/edit/`}><Button>Edit</Button></Link>
                        <Button onClick={() => deleteUser(item.id)}>Delete</Button>
                    </li>
                    )
                })}
            </ul>
            <br></br>
            <h1>Transaction</h1>
            <ul>
                {transactions?.map((item) => {
                    return (
                    <li key={item.id}>
                        <Link to={`/admin/transactions/${item.id}/`}>{item.created}</Link>
                        <Link to={`/admin/transactions/${item.id}/edit/`}><Button>Edit</Button></Link>
                        <Button onClick={() => deleteTransaction(item.id)}>Delete</Button>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default AdminDashboard