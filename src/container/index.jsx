import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import MainAppBar from '../components/bar';

const useStyles = makeStyles((theme) => ({
    bgImage: {
        height: '100%',
        width: '100%',
        backgroundImage: "url('/background.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
    }
}))

export const ContainerElement = (props) => {
    const classes = useStyles();
    return <Container maxWidth="xl" style={{padding: '0px', minHeight: '100vh'}} className={classes.bgImage}>
        <MainAppBar {...props}/>
    </Container>
}