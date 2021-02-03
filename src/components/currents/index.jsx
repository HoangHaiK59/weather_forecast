import React from 'react';
import { Container, Input, TextField, InputAdornment } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { OWM_APIKEY } from '../constants/apikey';
import { Grid, makeStyles, fade, Paper } from '@material-ui/core';
import { Search, LocationOn, Cloud } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { cities } from '../citites';
import * as moment from 'moment';

const useStyles = makeStyles((theme) => ({
    option: {
        fontSize: 15,
        fontWeight: '600',
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        }
    },
    root: {
        flexGrow: 1,
        '& .MuiTextField-root': {
            width: '100%',
        },
    },
    inputRoot: {
        color: 'inherit',
        border: '1px solid white'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        marginLeft: theme.spacing(2)
    },
    search: {
        marginTop: theme.spacing(4),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        width: '400px',
        boxShadow: theme.shadows[3],
    },
    searchIcon: {
        padding: theme.spacing(0,1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    city: {
        fontSize: '2.5rem',
        textShadow: '1px 1px black',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.2rem',
        }
    },
    cloud: {
        fontSize: 140,
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: '6.5rem'
        }
    },
    paper: {
        width: 200,
        height: 200
    },
    autoComplete: {
        width: 600,
        marginTop: theme.spacing(10),
        [theme.breakpoints.between('xs', 'sm')]: {
            width: 320
        }
    },
    textField: {
        border: 0,
        position: 'relative',
        margin: 0,
        padding: 0
    },
    locationName: {
        marginTop: theme.spacing(2),
        height: 80,
    },
    tempure: {
        height: 200,
    },
    parameter: {
        height: 200,
        backgroundColor: 'rgba(85, 154, 194, .5)',
        borderRadius: '5px'

    },
    cloudInfo: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '40px 0',
        position: 'relative',
        flexDirection: 'column',
    },
    celcius: {
        fontSize: '110px',
        textShadow: '1px 1px black',
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: '1.5rem'
        }
    },
    cloudName: {
        fontSize: '1.2rem',
        padding: '0 10px'
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
        width: '33%',
        marginTop: '10px',
        '& > p': {
            fontSize: '1.7rem',
            [theme.breakpoints.down('sm')]: {
                fontSize: '1.1rem',
            }
        }
    },
    datetime: {
        fontSize: '1.8rem',
        textShadow: '1px 1px black',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.9rem',
        }
    }
}))

const Current = props => {
    const classes = useStyles();
    const [current, setCurrent] = React.useState(null);
    React.useEffect(() => {
        getWeather();
    }, [])
    const getWeather = async e => {
        console.log('api cal')
        try {
            const promise = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Ha noi,vn&appid=${OWM_APIKEY}`);
            const response = await promise.json();
            console.log(response);
    
            setCurrent(response);
            localStorage.setItem('temp', JSON.stringify(response))
        } catch(error) {
            console.log(error)
        }
    } 
    const renderCityCountry = (key, data) => {
        return <React.Fragment>
            <h2 className={classes.city}>{data[key] + ',' + data['sys'].country}</h2>
        </React.Fragment>
    }
    const renderTempureorMain = (key, data) => {
        if (key === 'weather') {
            return <React.Fragment key={key}>
                {
                    
                    data[key].map(d =><h3 key={d.id.toString()} className={classes.cloudName}>{d?.description}</h3>)
                }
            </React.Fragment>
        } else if(key === 'main') {
            return <React.Fragment key={key}>
               <h3 className={classes.celcius}>{Math.floor(data[key]?.temp - 273.15)} &#8451;</h3>
            </React.Fragment>
        }
    }
    const renderParameter = (key, data) => {
        if (key === 'sys') {
            return <React.Fragment key={key}>
                <div className={classes.extractItem}>
                    <p>Sunrise</p>
                    <p>{moment(data[key]?.sunrise).format('hh:mm')}</p>
                </div>
                <div className={classes.extractItem}>
                    <p>Sunset</p>
                    <p>{moment(data[key]?.sunset).format('hh:mm')}</p>
                </div>
            </React.Fragment>
        } else if (key === 'main') {
            return <React.Fragment key={key}>
                <div className={classes.extractItem}>
                    <p>Feels like</p>
                    <p>{Math.floor(data[key]?.feels_like - 273.15)} &#8451;</p>
                </div>
                <div className={classes.extractItem}>
                    <p>High</p>
                    <p>{Math.floor(data[key]?.temp_max - 273.15)} &#8451;</p>
                </div>
                <div className={classes.extractItem}>
                    <p>Low</p>
                    <p>{Math.floor(data[key]?.temp_min - 273.15)} &#8451;</p>
                </div>
            </React.Fragment>
        } else if (key === 'wind') {
            return <React.Fragment key={key}>
                <div className={classes.extractItem}>
                    <p>Wind</p>
                    <p>{data[key]?.speed}mph</p>
                </div>
            </React.Fragment>
        }
        return null
    }
    const renderDate = (key = 'dt', data) => {
        return <h3 className={classes.datetime}>{moment(data[key]).format('DD MMM YYYY')}</h3>
    }
console.log(current)
    return (
        current && <Container maxWidth="lg">
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12} md={12}>
                    <Grid container justify="center">
                        <Autocomplete 
                        id="cities"
                        disableClearable
                        autoHighlight
                        options={cities}
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
                <Grid className={classes.locationName} item xs={12} md={12}>
                    <Grid container justify="flex-start" direction="column">
                        {renderCityCountry('name', current)}
                        {renderDate('dt', current)}
                    </Grid>
                </Grid>
                <Grid className={classes.tempure} item xs={12} md={6}>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={4} md={3}>
                            <Cloud className={classes.cloud} />
                        </Grid>
                        <Grid item xs={8} md={9}>
                            <div className={classes.cloudInfo}>
                                {renderTempureorMain('main', current)}
                                {renderTempureorMain('weather', current)}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.parameter} item xs={12} md={6}>
                    <Grid container justify="flex-start">
                        <div className={classes.extract}>
                            {
                                Object.keys(current).map(key => renderParameter(key, current))
                            }
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default withRouter(Current);