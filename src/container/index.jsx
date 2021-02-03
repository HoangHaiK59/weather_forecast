import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import MainAppBar from '../components/bar';

const useStyles = makeStyles((theme) => ({
    bgImage: {
        backgroundImage: "url('/bluebg.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        minHeight: '100vh',
        width: '100%',
        padding: 0,
        '&::before': {
            content: '""',
            minHeight: '100vh',
            background: 'linear-gradient(to bottom right, rgba(197, 31, 31, 1), rgba(5,60,3,1))'
        }
    }
}))

export const ContainerElement = (props) => {
    const classes = useStyles();
    return <Container maxWidth="xl" className={classes.bgImage}>
        <MainAppBar {...props}/>
    </Container>
}