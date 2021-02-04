import React from 'react';
import { Container, Grid, Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { cities } from '../citites';
import { OWM_APIKEY } from '../constants/apikey';
import * as moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    locationCard: {
        minWidth: '45%',
        height: '400px',
        [theme.breakpoints.down('sm')]: {
            height: '300px'
        },
        position: 'relative'
    },
    cardContent: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: 'rgba(85, 154, 194, .5)'
    },
    cardPara: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
        }
    },
    celcius: {
        fontSize: '2rem',
        textShadow: '1px 1px black',
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: '1rem'
        }
    },
    cloudName: {
        fontSize: '.5rem',
        padding: '0 10px'
    },
    parameter: {
        height: 150,
        [theme.breakpoints.down('sm')]: {
            height: 100
        },
        width: '100%'
    },
    extract: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: '10px',
        width: '100%'
    },
    extractItem: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '25%',
        marginTop: '10px',
        '& > p': {
            fontSize: '.9rem',
            [theme.breakpoints.down('sm')]: {
                fontSize: '.5rem',
            }
        }
    },
}))

const SpecificLocation = (props) => {
    const classes = useStyles();
    const [cityId, setCityId] = React.useState(document.cookie.split(';').find(v => v.indexOf('cityId') > -1) ? document.cookie.split(';').find(v => v.indexOf('cityId') > -1).split('=')[1]: 1581129)
    const [spcLocation, setSpcLocation] = React.useState(localStorage.getItem('temp') ? JSON.parse(localStorage.getItem('temp')): null);
    // React.useEffect(() => {
    //     getWeatherSpecificLocation(cityId)
    // }, [cityId])
    const getWeatherSpecificLocation = async cityId => {
        // localStorage.removeItem('temp')
        const city = cities.find(c => c.id === +cityId);
        try {
            const result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=minutely&appid=${OWM_APIKEY}&lang=vi`);
            let response = await result.json();
            delete response.lat
            delete response.lon
            delete response.timezone
            delete response.timezone_offset
            setSpcLocation(response)
            localStorage.setItem('temp', JSON.stringify(response))
        } catch(error) {
            console.log(error)
        }
    }
    const renderIcon = (keyParent, key = 'weather', data) => {
        console.log(data[keyParent][key])
        const url = `http://openweathermap.org/img/wn/${data[keyParent][key][0].icon}@2x.png`;
        return <img src={url} alt="icon" />
    }
    const renderByKey = (key, data) => {
        if (key === 'current') {
            return (
                <Card className={classes.cardContent} key={key}>
                    <CardContent className={classes.cardPara}>
                        <Typography variant="h4" className={classes.title} color="textSecondary" gutterBottom>
                            {key}
                        </Typography>
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={4} md={3}>
                                {/* <Cloud className={classes.cloud} /> */}
                                {renderIcon(key, 'weather',data)}
                            </Grid>
                        <Grid item xs={8} md={9}>
                                <div className={classes.cloudInfo}>
                                    {renderTemperatureorMain(key, 'temp', data)}
                                    {renderTemperatureorMain(key, 'weather', data)}
                                </div>
                            </Grid>
                        </Grid>
                        <Grid className={classes.parameter} item xs={12} md={12}>
                            <Grid container justify="flex-start">
                                <div className={classes.extract}>
                                    {
                                        Object.keys(data).map(key => renderParameter(key, data))
                                    }
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )
        }
        // } else if (key === 'hourly') {
        //     return (
        //         <Card className={classes.cardContent}>
        //             <CardContent>
        //                 <Typography variant="h4" className={classes.title} color="textSecondary" gutterBottom>
        //                     {key}
        //                 </Typography>
        //                 <Grid container justify="center" alignItems="center">
        //                     <Grid item xs={4} md={3}>
        //                         {/* <Cloud className={classes.cloud} /> */}
        //                         {renderIcon(key, 'weather',data)}
        //                     </Grid>
        //                 <Grid item xs={8} md={9}>
        //                         <div className={classes.cloudInfo}>
        //                             {renderTemperatureorMain(key, 'temp', data)}
        //                             {renderTemperatureorMain(key, 'weather', data)}
        //                         </div>
        //                     </Grid>
        //                 </Grid>
        //                 <Grid className={classes.parameter} item xs={12} md={6}>
        //                     <Grid container justify="flex-start">
        //                         <div className={classes.extract}>
        //                             {
        //                                 Object.keys(data).map(keyC => renderParameter(keyC, data))
        //                             }
        //                         </div>
        //                     </Grid>
        //                 </Grid>
        //             </CardContent>
        //         </Card>
        //     )
        // }
        return null
    }
    const renderTemperatureorMain = (keyParent, keyChildren, data) => {
        if (keyChildren === 'weather') {
            return <React.Fragment key={keyChildren}>
                {
                    
                    data[keyParent][keyChildren].map(d =><h3 key={d.id.toString()} className={classes.cloudName}>{d?.description}</h3>)
                }
            </React.Fragment>
        } else if(keyChildren === 'temp') {
            return <React.Fragment key={keyChildren}>
               <h3 className={classes.celcius}>{Math.floor(data[keyParent]?.temp - 273.15)} &#8451;</h3>
            </React.Fragment>
        }
    }
    const renderParameter = (key, data) => {
        if (key === 'current') {
            return <React.Fragment key={key}>
                <div className={classes.extractItem}>
                    <p>Feels like</p>
                    <p>{Math.floor(data[key]?.feels_like - 273.15)} &#8451;</p>
                </div>
                <div className={classes.extractItem}>
                    <p>Sunrise</p>
                    <p>{moment(data[key]?.sunrise).format('hh:mm')}</p>
                </div>
                <div className={classes.extractItem}>
                    <p>Sunset</p>
                    <p>{moment(data[key]?.sunset).format('hh:mm')}</p>
                </div>
                <div className={classes.extractItem}>
                    <p>Wind</p>
                    <p>{data[key]?.wind_speed }mph</p>
                </div>
                <div className={classes.extractItem}>
                    <p>Humidity </p>
                    <p>{data[key]?.humidity}%</p>
                </div>
                <div className={classes.extractItem}>
                    <p>UV </p>
                    <p>{data[key]?.uvi}</p>
                </div>
                <div className={classes.extractItem}>
                    <p>Cloud </p>
                    <p>{data[key]?.clouds}%</p>
                </div>
                <div className={classes.extractItem}>
                    <p>Pressure </p>
                    <p>{data[key]?.pressure} hPa</p>
                </div>
            </React.Fragment>
        } else if (key === 'hourly') {
            <React.Fragment key={key}>
                <div className={classes.extractItem}>
                    <p>Feels like</p>
                    <p>{Math.floor(data[key]?.feels_like - 273.15)} &#8451;</p>
                </div>
                <div className={classes.extractItem}>
                    <p>Wind</p>
                    <p>{data[key]?.wind_speed }mph</p>
                </div>
                <div className={classes.extractItem}>
                    <p>Humidity </p>
                    <p>{data[key]?.humidity}%</p>
                </div>
                <div className={classes.extractItem}>
                    <p>UV </p>
                    <p>{data[key]?.uvi}</p>
                </div>
            </React.Fragment>
        }
        return null
    }
    console.log(spcLocation)
    return (
        spcLocation && <Container maxWidth="lg">
            <Grid container className={classes.root} spacing={2}>
                <Grid className={classes.locationCard} item xs={12} sm={12} md={6}>
                    {
                        Object.keys(spcLocation).map(key => renderByKey(key, spcLocation))
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default withRouter(SpecificLocation);