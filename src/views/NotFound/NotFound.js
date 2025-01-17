import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  },
  videoTag:{  
    borderColor:'#FFFFFF',
    borderWidth: 2,
    borderStyle: 'solid',
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560 /* optional depending on what you want to do in your app */

  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={4}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <div className={classes.content}>
            <Typography variant="h1">
              404: A página que você está procurando não está aqui
            </Typography>
            <Typography variant="subtitle2">
            Você tentou alguma uma rota inexistente ou veio aqui por engano. 
            Seja qual for, tente usar a navegação
            </Typography>
    
            <video
              autoPlay
              className={classes.videoTag}
              loop
              muted
            >
              <source
                src="/images/404_1.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
