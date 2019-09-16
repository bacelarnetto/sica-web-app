import React, { useEffect }from 'react';
import { useSelector,  useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import {  Creators as actions } from './../../store/actions/categoria';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Categoria = () => {
  useFetching(useDispatch(), actions.buscaCategorias());
  const categoria  = useSelector( state  => state.categoria );
  const classes = useStyles();
  return (
    <div className={classes.root}  >
      {JSON.stringify(categoria.data)}
    </div>
  );
};

const useFetching = (dispatch, action) => {
  const array = [];
  useEffect(() => {
    dispatch(action);
  }, array)
}

export default Categoria ;
