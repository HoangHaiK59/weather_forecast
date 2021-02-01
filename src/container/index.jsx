import React from 'react';
import { Container } from '@material-ui/core';
import MainAppBar from '../components/bar';

export const ContainerElement = (props) => {
    return <Container maxWidth="xl" style={{padding: '0px'}}>
        <MainAppBar {...props}/>
    </Container>
}