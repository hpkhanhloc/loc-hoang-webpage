import React, { useState } from 'react'
import { TextField, Button, Container, Paper, FormControl, Box, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createBlog } from '../actions/blogActions'
import { useStyles } from '../styles'

const CreateBlog = () => {
    const [newBlog, setNewBlog] = useState({title: '', content: ''})
    const history = useHistory()
    const dispatch = useDispatch()
    const classes = useStyles()()

    const handleChange = (event) => {
        setNewBlog(
            {...newBlog,
            [event.target.id]: event.target.value}
        )
    }
    const handleCancel = (event) => {
        event.preventDefault()
        setNewBlog({title: '', content: ''})
        history.push("/blogs")
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(`New Blog ${newBlog.title} ${newBlog.content}`)
        dispatch(createBlog(newBlog))
        history.push("/blogs")
    }
    return (
        <Container>
            <Paper variant="outlined">
                <Box m={2}>
                    <Typography variant="h6" align="center">New Blog</Typography>
                    <FormControl className={classes.formControl} fullWidth>
                        <TextField
                            id="title"
                            label="Title"
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth
                        />
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <TextField
                            id="content"
                            label="Content"
                            variant="outlined"
                            onChange={handleChange}
                            multiline={true}
                            rows={10}
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth
                        />
                    </FormControl>
                </Box>
                <Box m={2} display="flex" flexDirection="row" justifyContent="center">
                    <Button onClick={handleCancel} variant="contained" color="primary" style={{marginRight: 16}}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary" style={{marginRight: 16}}>Create</Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default CreateBlog
