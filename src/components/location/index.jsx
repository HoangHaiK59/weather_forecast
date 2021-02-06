import React from 'react';
import { Container, Grid, Card, CardContent, makeStyles, Typography, MobileStepper, useMediaQuery, useTheme, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { cities } from '../citites';
import { OWM_APIKEY } from '../constants/apikey';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
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
    hourlyCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.between('xs', 'sm')]: {
            height: 120,
            '& > img': {
                height: 60,
                width: 60
            }
        },
    },
    hourlyCardTemperature: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%'
    },
    celciusStepper: {
        fontSize: '1.5rem',
        textShadow: '1px 1px black',
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: '1rem'
        }
    },
    cloudStep: {
        fontSize: '.5rem',
        padding: '0 10px'
    },

}))

const SpecificLocation = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down('sm'));
    const [activeStep, setActiveStep] = React.useState(0);
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
    const next = () => {
        setActiveStep((prevStep) => prevStep + 1)
    }
    const prev = () => {
        setActiveStep((prevStep) => prevStep - 1)
    }
    const renderIcon = (keyParent, key = 'weather', data) => {
        const url = `http://openweathermap.org/img/wn/${data[keyParent][key][0].icon}@2x.png`;
        return <img src={url} alt="icon" />
    }
    const renderIconWithSize = (size = 2, key = 'weather', data) => {
        const url = `http://openweathermap.org/img/wn/${data[key][0].icon}@${size}x.png`;
        return <img src={url} alt="icon" />
    }
    const renderHourTemperature = data => {
        return <h4 className={classes.celciusStepper}>{Math.floor(data['temp'] - 273.15) } &#8451;</h4>
    }
    const renderUVandHum = (data) => {
        return <div className={classes.hourlyCardTemperature}>
            <p>{data['uvi']}</p>
            <p>{data['humidity']}%</p>
        </div>
    }
    const renderStepper = (activeIndex = 0, arrayStepper = [[]]) => {
        const groupActive = arrayStepper[activeIndex];
        const numberCard = Math.floor(12 / groupActive.length);
        if (groupActive.length > 0) {
            return <Grid container justify="space-around" alignItems="flex-start">
                {
                    groupActive.map((gr, id) => <Grid key={id} item xs={6} sm={6} md={numberCard} lg={numberCard}>
                        <div className={classes.hourlyCard}>
                            {renderIconWithSize(2, 'weather', gr)}
                            {renderHourTemperature(gr)}
                            {renderUVandHum(gr)}
                        </div>
                    </Grid>)
                }
            </Grid>
        }
    }
    const groupByNumItem = (data = [], match) => {
        let result = [];
        if (match) {
            for (let i =0; i< data.length; i+=4) {
                result.push(data.slice(i, i+4))
            }
        } else {
            for (let i =0; i< data.length; i+=8) {
                result.push(data.slice(i, i+8))
            }
        }
        return result;
    }
    const renderDot = (data = [[]] ) => {
        return (
            <MobileStepper
            style={{width: '100%', background: 'transparent'}}
            steps={data.length}
            position="static"
            variant="dots"
            activeStep={activeStep}
            nextButton={
              <Button size="small" style={{color: '#fff'}} onClick={next} disabled={activeStep === data.length - 1}>
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button style={{color: '#fff'}} size="small" onClick={prev} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
              </Button>
            }
          />
        )
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
                            <Grid item xs={4} md={1}>
                                {/* <Cloud className={classes.cloud} /> */}
                                {renderIcon(key, 'weather',data)}
                            </Grid>
                        <Grid item xs={8} md={11}>
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
        } else if (key === 'hourly') {
            return (
                <React.Fragment key={key}>
                    <Typography variant="h5">
                        48 hours
                    </Typography>
                    {
                      renderStepper(activeStep, groupByNumItem(data[key], match))
                    }
                    {
                        renderDot(groupByNumItem(data[key], match))
                    }
                </React.Fragment>
            )
        }
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
                <Grid className={classes.locationCard} item xs={12} sm={12} md={12}>
                    {
                        Object.keys(spcLocation).map(key => renderByKey(key, spcLocation))
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default withRouter(SpecificLocation);