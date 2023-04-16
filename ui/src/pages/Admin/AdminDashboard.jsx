import { useState, useEffect } from 'react'
import { network, logger } from '../../utils'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, IconButton, ListItemSecondaryAction, ListItemText, ListItem, List} from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";

function UsersList({ users, deleteUser }) {
    return (
        <>
            <Typography variant="h5" component="h2" gutterBottom>
                Users
            </Typography>
            <List>
                {users?.map((item) => (
                    <ListItem key={item.id}>
                        <Link to={`/admin/users/${item.id}`}>
                            <ListItemText primary={item.username} />
                        </Link>
                        <ListItemSecondaryAction>
                            <Link to={`/admin/users/${item.id}/edit`}>
                                <Button variant="contained" color="primary">
                                    Edit
                                </Button>
                            </Link>
                            <IconButton onClick={() => deleteUser(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </>
    );
}

function TransactionsList({ transactions, deleteTransaction }) {
    return (
        <>
            <Typography variant="h5" component="h2" gutterBottom>
                Transactions
            </Typography>
            <List>
                {transactions?.map((item) => (
                    <ListItem key={item.id}>
                        <Link to={`/admin/transactions/${item.id}`}>
                            <ListItemText primary={new Date(item.created).toLocaleString()} />
                        </Link>
                        <Typography sx={{ml: 5}}>{item.transaction_type}</Typography>
                        <ListItemSecondaryAction>
                            <Link to={`/admin/transactions/${item.id}/edit`}>
                                <Button variant="contained" color="primary">
                                    Edit
                                </Button>
                            </Link>
                            <IconButton onClick={() => deleteTransaction(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </>
    );
}




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
            <UsersList users={users} deleteUser={deleteUser} />
            <br />
            <TransactionsList transactions={transactions} deleteTransaction={deleteTransaction} />

        </div>
    )
}

export default AdminDashboard