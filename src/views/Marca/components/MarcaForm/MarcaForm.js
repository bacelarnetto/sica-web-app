import React, { useState,  useEffect } from 'react';
import { useSelector,  useDispatch } from 'react-redux';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

import { Creators as actions } from './../../../../store/actions/marca';

const useStyles = makeStyles(() => ({
  root: {},
  button:{
    color:'#FFFFFF',
    backgroundColor:'#235244',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#14352c'
    }
  },  
}));

const MarcaForm = props => {
  const { className, keyItem, ...rest } = props;

  const classes = useStyles();

  const isEdit = () => {
    return  keyItem !== 'new'
  }

  const dispatch = useDispatch();  
  useFetching(dispatch, actions.buscaMarca(keyItem), isEdit());
  const marca = useSelector( state  => state.marca.marca );
  console.log('--->' + marca.id +'-'+ marca.nome)

  const [values, setValues] = useState({
    id: isEdit() ? marca.id: '',
    nome: isEdit() ? marca.nome : ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    if(isEdit()) {
      dispatch(actions.editMarca(values),[])
    }else{
      dispatch(actions.insertMarca(values),[])
      setValues({ id: '',  nome:'' });
    }
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <CardHeader
          subheader={isEdit() ? 'ALTERAÇÃO' : 'CADASTRO'}
          title="Marca"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            { isEdit() &&
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                disabled
                fullWidth
                label="Cod."
                margin="dense"
                name="id"
                onChange={handleChange}
                required
                value={values.id}
                variant="outlined"
              />
            </Grid>}
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Por favor, preencha o nome."
                label="Nome"
                margin="dense"
                name="nome"
                onChange={handleChange}
                required
                value={values.nome}
                variant="outlined"
              />
            </Grid>
            
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            className={classes.button}
            color="primary"
            type="submit"
            variant="contained"
          >
            {isEdit() ? 'Editar' : 'Salvar'}
          </Button>
          <Link to="/marca">
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
            >
            Cancelar
            </Button>
          </Link>
        </CardActions>
      </form>
    </Card>
  );
};


const useFetching = (dispatch, action, isEdit) => {
  const array = [];
  useEffect(() => {
    if(isEdit){
      dispatch(action);
    }
  }, array)
}



MarcaForm.propTypes = {
  className: PropTypes.string
};

export default MarcaForm;
