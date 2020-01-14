import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { CategoriasTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Categoria = () => {
  
  const classes = useStyles();
  return (
    <div className={classes.root}  >
      <div className={classes.content} />
      <CategoriasTable  />
    </div>
  );
};

export default Categoria ;
