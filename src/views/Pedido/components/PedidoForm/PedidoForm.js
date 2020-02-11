import React, {forwardRef, useState,  useEffect } from 'react';

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
  Typography
} from '@material-ui/core';


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import MaterialTable from 'material-table';

import { Creators as actions } from './../../../../store/actions/pedido';
import {  isEdit }  from './../../../../common/util';

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

const PedidoForm = props => {
  const { className, keyPedido, keyFornecedor, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    id:  '',
    nomeFornecedor: '',
  });

  const [showErrors, setShowErrors] = useState(false);

  const dispatch = useDispatch();  
  useFetching(dispatch, actions.buscaPedido(keyPedido, keyFornecedor));
  const pedido = useSelector( state  => state.pedido.pedido );
  const loading = useSelector( state  => state.pedido.loading );
  
  useEffect(() => {    
    let nameFronecedor = 
    pedido.fornecedor !== null &&    
    pedido.fornecedor !== '' &&
    pedido.fornecedor !== undefined &&
    pedido.fornecedor.nome !== null && 
    pedido.fornecedor.nome !== '' && 
    pedido.fornecedor.nome !== undefined ? pedido.fornecedor.nome: ''
    setValues({
      id:  pedido.id || '',
      nomeFornecedor: nameFronecedor ||'',
    });    
  }, [pedido])


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    if (!values.nome) {
      setShowErrors(true);
    } else {
      if(isEdit(keyPedido)) {
        dispatch(actions.editPedido(values),[])
      }else{
        dispatch(actions.insertPedido(values),[])
        setValues({ id: '',   nomeFornecedor:'' });        
      }
      setShowErrors(false);
    }
  }

  const [stateTable, setStateTable] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],

  });

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox
      {...props}
      ref={ref}
      style={{color: '#235244'}}
    />),
    Check: forwardRef((props, ref) => <Check
      {...props}
      ref={ref}
      style={{color: '#235244'}}
    />),
    Clear: forwardRef((props, ref) => <Clear
      {...props}
      ref={ref}
      style={{color: '#c62828'}}
    />),
    Delete: forwardRef((props, ref) => <DeleteOutline
      {...props}
      ref={ref}
      style={{color: '#c62828'}}
    />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight
      {...props}
      ref={ref}
    />),
    Edit: forwardRef((props, ref) => <Edit
      {...props}
      ref={ref}
      style={{color: '#235244'}}
    />),
    Export: forwardRef((props, ref) => <SaveAlt
      {...props}
      ref={ref}
    />),
    Filter: forwardRef((props, ref) => <FilterList
      {...props}
      ref={ref}
    />),
    FirstPage: forwardRef((props, ref) => <FirstPage
      {...props}
      ref={ref}
    />),
    LastPage: forwardRef((props, ref) => <LastPage
      {...props}
      ref={ref}
    />),
    NextPage: forwardRef((props, ref) => <ChevronRight
      {...props}
      ref={ref}
    />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft
      {...props}
      ref={ref}
    />),
    ResetSearch: forwardRef((props, ref) => <Clear
      {...props}
      ref={ref}
    />),
    Search: forwardRef((props, ref) => <Search
      {...props}
      ref={ref}
      style={{color: '#235244'}}
    />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward
      {...props}
      ref={ref}
    />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove
      {...props}
      ref={ref}
    />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn
      {...props}
      ref={ref}
    />)
  };

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
            subheader={isEdit(keyPedido) ? 'ALTERAÇÃO' : 'CADASTRO'}
            title="Pedido" 
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
      
              { isEdit(keyPedido) &&
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
            </Grid>
            <br/>
            <MaterialTable
              columns={stateTable.columns}
              data={stateTable.data}
              editable={{
                onRowAdd: newData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      setStateTable(prevState => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        setStateTable(prevState => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }, 600);
                  }),
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      setStateTable(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
              }}
              icons={tableIcons}
              localization={{
                body: {
                  emptyDataSourceMessage: 'Nenhum registro encontrado!',
                  addTooltip: 'Adicionar',
                  deleteTooltip: 'Remover',
                  editTooltip: 'Alterar',
                },
                header: {
                  actions: ''
                },
                toolbar: {
                  searchTooltip: 'Pesquisar',
                  searchPlaceholder: 'Pesquisar'
                },
      
              }}
              options={{
                paging: false
              }}
              title={`Fornecedor: ${values.nomeFornecedor}`}
              
            
            />
     
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
              {isEdit(keyPedido) ? 'Editar' : 'Salvar'}
            </Button>
            <RouterLink to="/pedido">
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

    </div>
  );
};

const useFetching = (dispatch, action) => {
  const array = [];
  useEffect(() => {    
    dispatch(action);  
    /* eslint-disable-next-line */
  }, array)
}

PedidoForm.propTypes = {
  className: PropTypes.string
};

export default PedidoForm;