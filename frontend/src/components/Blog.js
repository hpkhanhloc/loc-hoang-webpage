import React from 'react';
import { useParams } from "react-router-dom";
import { Container, Paper, Box, Typography } from '@material-ui/core';
import { useStyles } from "../styles";
import { useSelector } from 'react-redux';

const Blog = () => {
    const id = useParams().id
    const blog = useSelector(state => state.blog.blogs.find(blog => blog.id === id))
    const classes = useStyles()()
    return (
        <Container>
            <Paper>
                <Box p={2}>
                    <Typography variant="h6">{blog.title}</Typography>
                    <Typography variant="body2">
                        {blog.content}
                    </Typography>
                </Box>
            </Paper>
        </Container>
    ) 
}

export default Blog;
