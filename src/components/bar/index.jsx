import React from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem, Badge, InputBase, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import clxs from 'clsx';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/More';
//import InboxIcon from '@material-ui/icons/Inbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import DashboardIcon from '@material-ui/icons/Dashboard';
//import CloudIcon from '@material-ui/icons/Cloud';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import HistoryIcon from '@material-ui/icons/History';
import AlarmIcon from '@material-ui/icons/Alarm';
import AutoRenewIcon from '@material-ui/icons/Autorenew';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { Switch, Route, withRouter } from 'react-router-dom';
import Current from '../currents';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        // Make the app bar z-index always one more than the drawer z-index
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#3f4145',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        whiteSpace: 'nowrap',
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        width: theme.spacing(7) + 1,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1
        }
    },
    drawerPaper: {
        width: drawerWidth,
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },  
    },
    searchIcon: {
        padding: theme.spacing(0,2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
        display: 'none',
    },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}))

const MainAppBar = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = event => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    
    const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    };
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={11} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </Menu>
    );

    const mapIcon2Index = index => {
        switch(index) {
            case 0: 
                return <DashboardIcon />;
            case 1:
                return <AlarmIcon />;
            case 2:
                return <AutoRenewIcon />;
            case 3:
                return <HistoryIcon />;
            case 4:
                return <CalendarIcon />;
            case 5:
                return <DateRangeIcon />;
        default:
            return null;
        }
    }

    const handleClickPath = (text, index) => {
        let textReplace = '';
        if (text.indexOf('/') > -1) {
            textReplace = text.replace(/\\/g, '-').replace(/\s+/g, '').toLowerCase();
        } else {
            textReplace = text.replace(/\s+/g,'').toLowerCase();
        }
        console.log(textReplace, props)
        props.history.push(textReplace)
    }

    const renderDrawer = (
        <div>
            <div className={classes.toolbar}>
                <IconButton onClick={toggleDrawer('left', false)}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List component="nav">
                {['Dashboard', 'Current', '16 Day/Daily', 'History', '5 Day/3H', '30 Day'].map((text, index) => (
                    <ListItem button key={text} onClick={() => handleClickPath(text, index)}>
                        <ListItemIcon>{mapIcon2Index(index)}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    )

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={clxs(classes.appBar, {
                [classes.appBarShift]: state.left
            })}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" className={clxs(classes.menuButton, {
                        [classes.hide]: state.left
                    })} onClick={toggleDrawer('left', true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                      
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={17} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                        </IconButton>
                        <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                        >
                        <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                        >
                        <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <React.Fragment key={'left'}>
                <Hidden smUp >
                    <Drawer
                        container={container}
                        variant="temporary"
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        open={state.left}
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        onClose={toggleDrawer('left', false)}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {renderDrawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown >
                    <Drawer
                        onMouseMove={toggleDrawer('left', true)}
                        onMouseLeave={toggleDrawer('left', false)}
                        variant="permanent"
                        className={clxs(classes.drawer, {
                            [classes.drawerOpen]: state.left,
                            [classes.drawerClose]: !state.left,
                        })}
                        classes={{
                            paper: clxs({
                                [classes.drawerOpen]: state.left,
                                [classes.drawerClose]: !state.left
                            })
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {renderDrawer}
                    </Drawer>
                </Hidden>
            </React.Fragment>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route extract path="/current" render={props => <Current {...props} />}/>
                </Switch>
            </main>
            {renderMobileMenu}
            {renderMenu}
        </div>
    )
}

export default withRouter(MainAppBar)