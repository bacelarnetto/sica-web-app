import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { MarcasTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Marca = () => {
  
  const classes = useStyles();

  return (
    <div className={classes.root}  >
      <div className={classes.content} >        
        <MarcasTable  />      
      </div>
    </div>
  );
};



export default Marca ;
