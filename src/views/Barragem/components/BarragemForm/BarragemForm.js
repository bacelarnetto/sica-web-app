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
  TextField
} from '@material-ui/core';
import InputMask from 'react-input-mask'
import Backdrop from '@material-ui/core/Backdrop';

import { Creators as actions } from './../../../../store/actions/barragem';
import {  isEdit }  from './../../../../common/util';
import validation from './../../../../common/validationUtil';
import estados  from './../../../../common/UF';

const useStyles = makeStyles(theme => ({
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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  loadingBlock:{
    zIndex: theme.zIndex.drawer + 2,
  }
}));

const BarragemForm = props => {
  const { className, keyItem, ...rest } = props;

  const classes = useStyles();
  const UFs = estados;
  const [values, setValues] = useState({
    id:  '',
    descricao: '',
    empreendedor: '',
    cnpjEmpreendedor: '',
    minerio: '',
    tipo: '',
    alimentadoUsina: '',
    codigoCategoriaRisco: '',
    codigoDanoPotencial: '',
    codigoObjetivoContencao: '',
    codigoSituacaoOperacional: '', 
    cidade: '',
    uf: 'sel',
    latitude: '',
    longitude: '',
    vidaUtilQuantidadeAnos: '',
  });

  const [showErrors, setShowErrors] = useState(false);

  const dispatch = useDispatch();  
  useFetching(dispatch, actions.buscaDetailBarragem(keyItem), isEdit(keyItem));
  const barragem = useSelector( state  => state.barragem.barragem );
  const loading = useSelector( state  => state.barragem.loading );
  
  useEffect(() => {
    if(isEdit(keyItem)){
      setValues({
        id:  barragem.id || '',
        descricao: barragem.descricao ||'',
        empreendedor:  barragem.empreendedor ||'',
        cnpjEmpreendedor:  barragem.cnpjEmpreendedor||'',
        minerio:  barragem.minerio||'',
        tipo:  barragem.tipo || '',
        alimentadoUsina:  barragem.alimentadoUsina||'',
        codigoCategoriaRisco:  barragem.codigoCategoriaRisco||'sel',
        codigoDanoPotencial:  barragem.codigoDanoPotencial||'sel',
        codigoObjetivoContencao:  barragem.codigoObjetivoContencao||'sel',
        codigoSituacaoOperacional:  barragem.codigoSituacaoOperacional||'sel', 
        cidade: barragem.cidade || '',
        uf:  barragem.uf || 'sel',
        latitude:  barragem.latitude ||'',
        longitude:  barragem.longitude||'',
        vidaUtilQuantidadeAnos:  barragem.vidaUtilQuantidadeAnos || '',
      });
    }
  }, [barragem, keyItem])


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    if (!values.descricao) {
      setShowErrors(true);
    } else {
      if(isEdit(keyItem)) {
        dispatch(actions.editBarragem(values),[])
      }else{
        dispatch(actions.insertBarragem(values),[])
        setValues({ id: '',  descricao:'' });        
      }
      setShowErrors(false);
    }
  }

  return (
    <div>

   
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
            title="Barragem" 
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
                  helperText={!values.descricao && showErrors && 'Por favor, preencha o descricao.'}
                  label="Nome"
                  margin="dense"
                  name="descricao"
                  onChange={handleChange}
                  required
                  value={values.descricao}
                  variant="outlined"
                />
              </Grid>

              <Grid
                item
                md={7}
                xs={12}
              >
                <TextField
                  error={validation.required(values.empreendedor.trim()) && showErrors}
                  fullWidth
                  helperText={showErrors && validation.required(values.empreendedor.trim())}
                  label="Empreendedor"
                  margin="dense"
                  name="empreendedor"
                  onChange={handleChange}
                  required
                  value={values.empreendedor}
                  variant="outlined"
                />
              </Grid>   

                         
              <Grid
                item
                md={5}
                xs={12}
              >               
                <InputMask
                  mask="999.999.999/9999-99"
                  onChange={handleChange}
                  value={values.cnpjEmpreendedor}
                >
                  {(inputProps) => 
                    <TextField
                      {...inputProps}
                      error={validation.required(values.cnpjEmpreendedor) && showErrors}
                      fullWidth
                      helperText={showErrors && validation.required(values.cnpjEmpreendedor)}
                      label="CNPJ/Empreendedor"
                      margin="dense"
                      name="cnpjEmpreendedor"                 
                      required                  
                      variant="outlined"
                    />}
                </InputMask>
              </Grid>  

              <Grid
                item
                md={7}
                xs={12}
              >
                <TextField
                  error={validation.required(values.minerio.trim()) && showErrors}
                  fullWidth
                  helperText={showErrors && validation.required(values.minerio.trim())}
                  label="Minerio"
                  margin="dense"
                  name="minerio"
                  onChange={handleChange}
                  required
                  value={values.minerio}
                  variant="outlined"
                />
              </Grid> 

              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={validation.required(values.cidade.trim()) && showErrors}
                  fullWidth
                  helperText={showErrors && validation.required(values.cidade.trim())}
                  label="Cidade"
                  margin="dense"
                  name="cidade"
                  onChange={handleChange}
                  required
                  value={values.cidade}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >  
                <TextField
                  error={values.uf === 'sel' && showErrors}
                  fullWidth
                  helperText={values.uf === 'sel' && showErrors && 'Por favor, selecione um UF.'}
                  label="UF"
                  margin="dense"
                  name="uf"
                  onChange={handleChange}
                  required
                  // eslint-disable-next-line react/jsx-sort-props
                  select
                  SelectProps={{ native: true }}
                  value={values.uf}
                  variant="outlined"
                >
                  <option
                    value="sel"
                  >
                  Selecione
                  </option>
                  {UFs.map(option => (
                    <option
                      key={option.key}
                      value={option.key}
                    >
                      {option.value}
                    </option>
                  ))}
                </TextField>

              </Grid>

            </Grid>
      
            
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              className={classes.button}
              color="primary"
              disabled={loading}
              type="submit"
              variant="contained"
            >
              {isEdit(keyItem) ? 'Editar' : 'Salvar'}
            </Button>
            <RouterLink to="/barragem">
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
              >
            Cancelar
              </Button>
            </RouterLink >
          </CardActions>
        </form>
      </Card>

      <Backdrop
        className={classes.backdrop}
        open={loading}
      >
        <Card className={classes.loadingBlock}>
          <CardContent>
            <CircularProgress color="inherit" />
          </CardContent>        
        </Card>
      </Backdrop>
    </div>
  );
};

const useFetching = (dispatch, action, isEdit) => {
  const array = [];
  useEffect(() => {
    if(isEdit){
      dispatch(action);
    }
    /* eslint-disable-next-line */
  }, array)
}

BarragemForm.propTypes = {
  className: PropTypes.string
};

export default BarragemForm;
