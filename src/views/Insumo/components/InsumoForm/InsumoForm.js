import React, { useState,  useEffect } from 'react';
import { useSelector,  useDispatch } from 'react-redux';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link  as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  CircularProgress,
  TextField,
} from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { Creators as actions } from './../../../../store/actions/insumo';
import {  isEdit }  from './../../../../common/util';

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
  loadingContent:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center'
  }  
}));

const InsumoForm = props => {
  const { className, keyItem, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    id:  '',
    descricao: '',
    tipo: 'sel',
    marca: 'sel',
    status:'sel', 
  });

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const [showErrors, setShowErrors] = useState(false);

  const dispatch = useDispatch();  
  useFetching(dispatch, actions.buscaDetailInsumo(keyItem));
  const insumo = useSelector( state  => state.insumo.insumo );
  const types = useSelector( state  => state.insumo.typesInsumo );
  const marcas = useSelector( state  => state.insumo.marcas );
  const status= useSelector( state  => state.insumo.status );
  const loading = useSelector( state  => state.insumo.loading );
  
  useEffect(() => {
    if(isEdit(keyItem)){
      setValues({
        id:  insumo.id || '',
        descricao: insumo.descricao ||'',
    
      });
    }
  }, [insumo, keyItem])


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    if (!values.descricao || !values.tipo || values.tipo === 'sel' 
      || values.marca === 'sel'||  values.status=== 'sel' || !selectedDate  ) {
      setShowErrors(true);
    } else {
      if(isEdit(keyItem)) {
        dispatch(actions.editInsumo(values),[])
      }else{  
        dispatch(actions.insertInsumo(values, selectedDate),[])
        setValues({   
          id:  '',
          descricao: '',
          tipo: 'sel',
          marca: 'sel',
          status:'sel',           
        });        
      }
      setShowErrors(false);
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
          subheader={isEdit(keyItem) ? 'ALTERAÇÃO' : 'CADASTRO'}
          title="Insumo"
        />
        <Divider />
        <CardContent>
          { loading && (    
            <div className={classes.loadingContent}>
              <CircularProgress />
            </div>
          )}
          <Grid
            container
            spacing={3}
          >
            { isEdit(keyItem) &&
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
                error={!values.descricao && showErrors}
                fullWidth
                helperText={!values.descricao && showErrors && 'Por favor, preencha o nome.'}
                label="Nome"
                margin="dense"
                name="descricao"
                onChange={handleChange}
                required
                value={values.descricao}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={values.tipo === 'sel' && showErrors}
                fullWidth
                helperText={values.tipo === 'sel' && showErrors && 'Por favor, selecione um tipo.'}
                label="Tipo"
                margin="dense"
                name="tipo"
                onChange={handleChange}
                required
                // eslint-disable-next-line react/jsx-sort-props
                select
                SelectProps={{ native: true }}
                value={values.tipo}
              >
                <option
                  value="sel"
                >
                  Selecione
                </option>
                {types.map(option => (
                  <option
                    key={option.id}
                    value={option.id}
                  >
                    {option.nome}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={values.marca === 'sel' && showErrors}
                fullWidth
                helperText={values.marca === 'sel' && showErrors && 'Por favor, selecione uma marca.'}
                label="Marca"
                margin="dense"
                name="marca"
                onChange={handleChange}
                required
                // eslint-disable-next-line react/jsx-sort-props
                select
                SelectProps={{ native: true }}
                value={values.marca}
                
              >
                <option
                  value="sel"
                >
                  Selecione
                </option>
                {marcas.map(option => (
                  <option
                    key={option.id}
                    value={option.id}
                  >
                    {option.nome}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={values.status === 'sel' && showErrors}
                fullWidth
                helperText={values.status === 'sel' && showErrors && 'Por favor, selecione um status.'}
                label="Status"
                margin="dense"
                name="status"
                onChange={handleChange}
                required
                // eslint-disable-next-line react/jsx-sort-props
                select
                SelectProps={{ native: true }}
                value={values.status}
                
              >
                <option
                  value="sel"
                >
                  Selecione
                </option>
                {status.map(option => (
                  <option
                    key={option.id}
                    value={option.id}
                  >
                    {option.nome}
                  </option>
                ))}
              </TextField>
            </Grid>
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid
                item
                md={6}
                xs={12}
              >
                <KeyboardDatePicker
                  error={!selectedDate  && showErrors}
                  format="dd/MM/yyyy"
                  fullWidth
                  helperText={!selectedDate && showErrors && 'Por favor, preencha a data.'}
                  id="date-picker-dialog"
                  KeyboardButtonProps={{ 'aria-label': 'change date', }} 
                  label="Data de Aquisição"
                  margin="dense"
                  onChange={handleDateChange}
                  value={selectedDate}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            
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
            {isEdit(keyItem) ? 'Editar' : 'Salvar'}
          </Button>
          <RouterLink to="/insumo">
            <Button
              className={classes.button}
              color="primary"
              disabled={loading}
              variant="contained"
            >
            Cancelar
            </Button>
          </RouterLink >
        </CardActions>
      </form>
    </Card>
  );
};

const useFetching = (dispatch, action) => {
  const array = [];
  useEffect(() => {
    dispatch(action);   
    /* eslint-disable-next-line */
  }, array)
}

InsumoForm.propTypes = {
  className: PropTypes.string
};

export default InsumoForm;
