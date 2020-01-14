import React, { useEffect }from 'react';
import { useSelector,  useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/styles';

import { Creators as actions } from './../../store/actions/categoria';
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
  useFetching(useDispatch(), actions.buscaCategorias());
  const categorias = useSelector( state  => state.categoria.data );
  const classes = useStyles();
  return (
    <div className={classes.root}  >
      {JSON.stringify(categorias)}
      <div className={classes.content} />
      <CategoriasTable categorias={categorias} />
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
