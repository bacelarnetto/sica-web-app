import React from 'react';

import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const MarcaForm = () => {
  
  const classes = useStyles();

  return (
    <div className={classes.root}  >
      <div className={classes.content} >
       
        teste
       
      </div>
    </div>
  );
};



export default MarcaForm ;
