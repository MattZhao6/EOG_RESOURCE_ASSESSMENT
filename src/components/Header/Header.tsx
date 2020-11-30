import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Weather from './weather';
import eog_resources_logo from './eog_resources_logo.png';



const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
    marginLeft: "170px",
  },

  logo: {
    position: "absolute", 
    width: "150px",
    height: "50px",
    top: "5px",
    left: "5px",
    cursor: "pointer",
  },
});

export default () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <img className = {classes.logo} src={eog_resources_logo} alt="Logo"/>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          Dear user! The below dashboard visualizes the historical values of a hypothetical set of equipment in the field
        </Typography>
        <Weather />
      </Toolbar>
    </AppBar>
  );
};



