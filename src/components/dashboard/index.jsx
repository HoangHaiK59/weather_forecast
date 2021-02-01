import React from 'react';
import { Container } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Container maxWidth={'xl'}>

            </Container>
        )
    }
}

export default withRouter(Dashboard);