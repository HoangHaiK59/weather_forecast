import React from 'react';
import { Container, Input, TextField, InputAdornment } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { OWM_APIKEY } from '../constants/apikey';
import { Grid, makeStyles, fade, Paper } from '@material-ui/core';
import { Search, LocationOn, Cloud } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { cities } from '../citites';

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
        fontSize: '2.5rem'
    },
    cloud: {
        fontSize: 140
    },
    paper: {
        width: 200,
        height: 200
    },
    autoComplete: {
        width: 600,
        marginTop: theme.spacing(10),
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
        height: 200
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
        fontSize: '110px'
    },
    cloudName: {
        fontSize: '1.2rem',
        padding: '0 10px'
    },
    extract: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '10px'
    }
}))

const Current = props => {
    const classes = useStyles();
    const [current, setCurrent] = React.useState(JSON.parse(localStorage.getItem('temp')) || null);
    const getWeather = async e => {
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
    React.useEffect(() => {
        // getWeather();
    }, [])
console.log(current)
    return (
        <Container maxWidth="lg">
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
                    <Grid container justify="flex-start">
                        <h2 className={classes.city}>Ha noi, VN</h2>
                    </Grid>
                </Grid>
                <Grid className={classes.tempure} item xs={12} md={6}>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={3} md={3}>
                            <Cloud className={classes.cloud} />
                        </Grid>
                        <Grid item xs={9} md={9}>
                            <div className={classes.cloudInfo}>
                                <h3 className={classes.celcius}>12 &#8451;</h3>
                                <h3 className={classes.cloudName}>Broken cloud</h3>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.tempure} item xs={12} md={6}>
                    <Grid container justify="flex-start">
                        <div className={classes.extract}>

                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default withRouter(Current);