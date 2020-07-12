import React, { useState } from 'react'
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import { useStyles } from '../styles'

const Login = () => {
    const [open, setOpen] = useState(false)
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles()()

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        console.log('Closed')
    }
    const handleInputUserName = (event) => {
        setUserName(event.target.value)
    }
    const handleInputPassword = (event) => {
        setPassword(event.target.value)
    }
    const handleLogin = () => {
        console.log(`Signed In ${username} ${password}`)
        setOpen(false)
    }
    return (
        <>
        <Button className={classes.loginButton} onClick={handleClickOpen}>Login</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="User name"
                    value={username}
                    onChange={handleInputUserName}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    onChange={handleInputPassword}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleLogin} color="primary">
                    Login
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default Login
