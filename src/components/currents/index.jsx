import React from 'react';
import { Container } from '@material-ui/core';
import { axiosInstance } from '../../helpers/axios';
import { withRouter } from 'react-router-dom';

const Current = props => {
    const [current, setCurrent] = React.useState(null);
    React.useEffect(() => {
        axiosInstance.get(`https://community-open-weather-map.p.rapidapi.com/weather?q=Vietnam,vn`)
        .then(result => {
            setCurrent(result.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])
    return (
        <Container>

        </Container>
    )
}

export default withRouter(Current);