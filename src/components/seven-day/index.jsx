import React from 'react';
import { makeStyles, Grid, Container, TextField, InputAdornment, useMediaQuery, useTheme, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { cities } from '../citites';
import { createCookiebyDate } from '../../common/function';
import { LocationOn, Search } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import * as moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        [theme.breakpoints.up('xs')]: {
            minHeight: window.innerHeight - 150,
        },
        position: 'relative'
    },
    gridRoot: {
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            height: window.innerHeight - 100,
        },
        [theme.breakpoints.down('sm')]: {
            height: 680,
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
    autoComplete: {
        width: 600,
        // marginTop: theme.spacing(10),
        [theme.breakpoints.between('xs', 'sm')]: {
            width: 320
        }
    },
}))
var cityIdCookie = document.cookie.split(';').find(v => v.indexOf('cityId') > -1) ? document.cookie.split(';').find(v => v.indexOf('cityId') > -1).split('=')[1]: 1581129
const SevenDayWeather = (props) => {
    const classes = useStyles();
    const [cityId, setCityId] = React.useState(cityIdCookie)
    const [value, setValue] = React.useState(cities.find(c => c.id === +cityIdCookie))
    const [daily, setDaily] = React.useState(localStorage.getItem('temp') ? JSON.parse(localStorage.getItem('temp')): null);
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down('sm'))
    const changeCity = (event, newValue) => {
        setCityId(newValue.id);
        setValue(newValue)
        createCookiebyDate('cityId', newValue.id, 7)
    }
    const renderOrderDate = (data = {}) => {
        return <Typography variant="h5">
            {
                moment(data.dt).format('ddd')
            }
        </Typography>
    }
    const renderIconWithSize = (size = 2, key = 'weather', data) => {
        const url = `http://openweathermap.org/img/wn/${data[key][0].icon}@${size}x.png`;
        return <img src={url} alt="icon" />
    }
    const renderHourTemperature = data => {
        return <div className={classes.hourlyCardTemperature}>
            <h4 className={classes.celciusStepper}>{Math.floor(data['temp']?.max - 273.15) } &#8451;</h4>
            <p>{Math.floor(data['temp']?.min - 273.15) } &#8451;</p>
        </div>
    }
    const renderUVandHum = (data) => {
        return <div className={classes.hourlyCardTemperature}>
            <p>{data['uvi']}</p>
            <p>{data['humidity']}%</p>
        </div>
    }
    const renderStepper = (numberItem = 8, arrayStepper = []) => {
        const numberCard = Math.floor(12 / numberItem);
        if (arrayStepper.length > 0) {
            return <Grid container justify="space-around" alignItems="flex-start">
                {
                    arrayStepper.map((gr, id) => <Grid key={id} item xs={6} sm={6} md={numberCard} lg={numberCard}>
                        <div className={classes.hourlyCard}>
                            {renderOrderDate(gr)}
                            {renderIconWithSize(2, 'weather', gr)}
                            {renderHourTemperature(gr)}
                            {renderUVandHum(gr)}
                        </div>
                    </Grid>)
                }
            </Grid>
        }
    }
    const renderByKey = (key, data) => {
        if (key === 'daily') {
            return (
                <React.Fragment key={key}>
                    {
                      renderStepper(match ? 2: 8, data[key])
                    }
                </React.Fragment>
            )
        }
        return null
    }
    return (
        <Container maxWidth="xl" className={classes.container}>
            <Grid container spacing={2} justify="space-around" alignItems="center" className={classes.gridRoot}>
                <Grid item xs={12} md={12}>
                    <Grid container justify="center">
                        <Autocomplete 
                        id="cities"
                        disableClearable
                        autoHighlight
                        options={cities}
                        value={value}
                        onChange={changeCity}
                        className={classes.autoComplete}
                        classes ={{option: classes.option}}
                        fullWidth
                        getOptionLabel={(option) => option.name}
                        renderOption={option => (<React.Fragment>
                            <span><LocationOn /></span>
                            {option.name}
                        </React.Fragment>)}
                        renderInput={(params) => {
                            params.InputProps.startAdornment = (
                                <>
                                    <InputAdornment position="start"><Search /></InputAdornment>
                                    {params.InputProps.startAdornment}
                                </>
                            )
                                
                                return <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Tìm kiếm địa chỉ"
                                    label="Địa chỉ"
                                    InputProps={{ ...params.InputProps, className: classes.inputRoot, type: 'search' }}
                                />
                        }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    {
                        Object.keys(daily).map(key => renderByKey(key, daily))
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default withRouter(SevenDayWeather)