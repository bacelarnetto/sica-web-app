import React, { useState } from 'react';
import { Link as RouterLink,  NavLink  } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { 
  AppBar, 
  Toolbar, 
  Badge, 
  Hidden, 
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    backgroundColor: '#eeeeee',
    borderBottomWidth:'thin',
    borderBottomStyle:'solid',
    borderBottomColor:'#cfd8dc',
    color:'#888888'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
    color: '#888888'

  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const [notifications] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <Grid
            alignItems="center"
            container
            direction="row"
            justify="center"
          >
            <img
              alt="Logo"
              src="/images/logos/filter_hdrlandscapeterrain.svg"
            />
            <h4
              className="MuiTypography-root MuiTypography-h4  MuiTypography-alignCenter"
              style={{color: '#235244'}}
            >SCA</h4></Grid>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={() => handleClickOpen()}
          >
            <InputIcon />
          </IconButton>
         
        </Hidden>        
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>        
      </Toolbar>

      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        keepMounted
        onClose={handleClose}
        open={open}
      >
        <DialogTitle id="alert-dialog-slide-title">{'Sair'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Tem certeza que deseja sair?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.buttonLabel}
            onClick={handleClose}
          >
            Não
          </Button>
          < NavLink to="/Logout">
            <Button
              className={classes.buttonLabel}
            >
            Sim
            </Button>
          </NavLink>
        </DialogActions>
      </Dialog>

    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
