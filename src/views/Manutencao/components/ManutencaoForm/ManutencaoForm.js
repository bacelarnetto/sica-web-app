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
  Typography,
} from '@material-ui/core';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import moment from 'moment';

import ptBrLocale from 'date-fns/locale/pt-BR';
import DateFnsUtils from '@date-io/date-fns';

import { Creators as actions } from './../../../../store/actions/manutencao';
import {  isEdit }  from './../../../../common/util';
import validation from './../../../../common/validationUtil';

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
  textArea:{
    '&:focus': {
      //you want this to be the same as the backgroundColor above
      borderColor: '#235244',
      borderWidth: 3
  
    }
  },
  loadingContent:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center'
  }  
}));

const ManutencaoForm = props => {
  const { className, keyManutencao, keyInsumo, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    id:  '',
    solicitante: '',
    descricao: '',
  });


  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const [showErrors, setShowErrors] = useState(false);

  const dispatch = useDispatch();  
  useFetching(dispatch, actions.buscaDetailManutencao(keyManutencao));
  const manutencao = useSelector( state  => state.manutencao.manutencao );
  const types = useSelector( state  => state.manutencao.typesManutencao );
  const loading = useSelector( state  => state.manutencao.loading );
  
  useEffect(() => {
    if(isEdit(keyManutencao)){
      if(manutencao !== null && manutencao !== '' &&  manutencao !== undefined ){      
        setValues({
          id:  manutencao.id || '',
          solicitante: manutencao.solicitante ||'', 
        });
        const dateFormt = moment(manutencao.dataCompra).format('DD/MM/YYYY');
        setSelectedDate(new Date(dateFormt))
      }
    }
  }, [manutencao, keyManutencao])


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });   
  };

  
  const handleSubmit = event => {
    event.preventDefault();
    if (validation.required(values.solicitante.trim())  
    || validation.required(values.descricao.trim())) {
      setShowErrors(true);
    } else {
      if(isEdit(keyManutencao)) {
        dispatch(actions.editManutencao(values, selectedDate),[])
      }else{  
        dispatch(actions.insertManutencao(values, keyInsumo),[])
        setValues({   
          id:  '',
          solicitante: '',
          descricao: '',           
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
          subheader={isEdit(keyManutencao) ? 'ALTERAÇÃO' : 'CADASTRO'}
          title="Manutencao"
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
            { isEdit(keyManutencao) &&
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
              md={10}
              xs={12}
            >
              <TextField
                error={validation.required(values.solicitante.trim()) && showErrors}
                fullWidth
                helperText={showErrors && validation.required(values.solicitante.trim())}
                label="Solicitante"
                margin="dense"
                name="solicitante"
                onChange={handleChange}
                required
                value={values.solicitante}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body2">Descrição</Typography>
              
              <TextareaAutosize
                aria-label="maximum height"               
                className={classes.textArea}
                label="Descrição"
                name="descricao"
                onChange={handleChange}
                placeholder="Descrição"
                style={{width:'100%', borderRadius: '5px', minHeight: '80px',maxHeight: '200px',
                  borderColor: validation.required(values.descricao.trim()) && showErrors && '#e53935'}}
                value={values.descricao}
              />
              { validation.required(values.descricao.trim()) && showErrors && (
                <Typography
                  style={{color:'#e53935'}}
                  variant="caption"
                >&nbsp;&nbsp;&nbsp;&nbsp;{showErrors && validation.required(values.descricao.trim())}</Typography>
              )}
            </Grid>

                        
          </Grid>
        </CardContent>
        { isEdit(keyManutencao) &&
        <CardContent>
          <Grid
            container
            spacing={3}
          >
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
                variant="outlined"
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
            
            
            <MuiPickersUtilsProvider
              locale={ptBrLocale}
              utils={DateFnsUtils}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <KeyboardDatePicker
                  cancelLabel="Cancelar"
                  error={!selectedDate  && showErrors}
                  format="dd/MM/yyyy"
                  fullWidth
                  helperText={!selectedDate && showErrors && 'Por favor, preencha a data.'}
                  id="date-picker-dialog" 
                  inputVariant="outlined"
                  KeyboardButtonProps={{ 'aria-label': 'change date', }}
                  label="Data de Aquisição"
                  locale="pt-br"
                  margin="dense"
                  onChange={handleDateChange}
                  value={selectedDate}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
          
        </CardContent>
        }
        <Divider />
        <CardActions>
          <Button
            className={classes.button}
            color="primary"
            type="submit"
            variant="contained"
          >
            {isEdit(keyManutencao) ? 'Editar' : 'Salvar'}
          </Button>
          
          <RouterLink to={isEdit(keyManutencao) ? '/manutencao' : '/insumo'}>
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

ManutencaoForm.propTypes = {
  className: PropTypes.string
};

export default ManutencaoForm;
