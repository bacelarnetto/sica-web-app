import React, { useState,  useEffect } from 'react';
import { useSelector,  useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Fab,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TextField,
  Grid,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import {
  Search
} from '@material-ui/icons';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import { Creators as actions } from './../../../../store/actions/marca';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  actions: {
    justifyContent: 'flex-end'
  },  
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  actionSearchContent:{
    display: 'flex',
    alignContent: 'center',
  },
  buttonSearch: {
    height: 20
  },
  btDelete:{
    color: '#c62828'
  },
  colAction:{
    textAlign: 'right'
  },
  loadingContent:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center'
  }

}));

const MarcasTable = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    nome: ''
  })
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id'); 
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');

  
  const dispatch = useDispatch();
  useFetching(dispatch, actions.buscaMarcas(values, page, rowsPerPage, order, orderBy));

  const marcas = useSelector( state  => state.marca.data );
  //const totalPages = useSelector( state  => state.marca.totalPages );
  //const itemsCountPerPage = useSelector( state  => state.marca.itemsCountPerPage );
  const totalElements = useSelector( state  => state.marca.totalElements );
  const loading = useSelector( state  => state.marca.loading );
  const deleteSuccess = useSelector( state  => state.marca.deleteSuccess );


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handlePageChange = (event, page) => {
    setPage(page);
    dispatch(actions.buscaMarcas(values, page, rowsPerPage, order, orderBy),[])
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
    dispatch(actions.buscaMarcas(values, page, event.target.value, order, orderBy),[])
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';    
    dispatch(actions.buscaMarcas(values, page, rowsPerPage, isAsc ? 'desc' : 'asc', property),[])
    let valorOrder =isAsc ? 'desc' : 'asc'
    setOrder(valorOrder);
    setOrderBy(property);
    console.log( `${isAsc} - property -${property}, ${order}, ${orderBy}`);
  }

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(actions.buscaMarcas(values, page, rowsPerPage, order, orderBy),[])

    console.log(totalElements)
  }

  const handleClickOpen = value => {
    setId(value)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setId('')
  };

  const handleRemove = event => {
    console.log('Exclusao:'+ id)
    dispatch(actions.deleteMarcas(id),[])
    event.preventDefault();
    dispatch(actions.buscaMarcas(values, page, rowsPerPage, order, orderBy),[deleteSuccess])
    setOpen(false);
  };

  const headCells = [
    { id: 'id', numeric: false, disablePadding: false, label: 'Codigo' },
    { id: 'nome', numeric: false, disablePadding: false, label: 'Nome' } ,
    { id: 'acao', numeric: false, disablePadding: false, label: '' }  
  ];
  /* eslint-disable react/prop-types */
  /* eslint-disable react/no-multi-comp */
  const EnhancedTableHead = (props) => {
    const { classes,  order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };  
    return (
      <TableHead>
        <TableRow>
          {headCells.map(headCell => (
            <TableCell
              align={headCell.numeric ? 'right' : 'left'}
              key={headCell.id}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={order}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
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
            subheader="Pesquisar"
            title="Marca de Insumos"
          />
          <Divider />
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
                  fullWidth
                  helperText="Por favor especifique o primeiro nome"
                  label="Nome:"
                  margin="dense"
                  name="nome"
                  onChange={handleChange}
                  required
                  value={values.nome}
                  variant="outlined"
                />
              </Grid>  
              <Grid
                className={classes.actionSearchContent}
                item
                md={6}
                xs={12}
              >
            
                <Fab
                  aria-label="pesquisar"
                  color="primary"
                  type="submit"
                >
                  <Search />
                </Fab>
              </Grid>              
            </Grid>
          </CardContent>
        </form>
      </Card>
      <br/>
      <div className={classes.colAction}>
        <Link to="/marca/new">
          <Fab
            aria-label="add"
            className={classes.margin}
            color="primary"
            size="medium"
            variant="extended"
          >
            <AddIcon />
          Cadastrar
          </Fab>
        </Link>
      </div>
      <br/>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <EnhancedTableHead
                  classes={classes}
                  onRequestSort={handleRequestSort}
                  order={order}
                  orderBy={orderBy}
                />
                <TableBody>
                  { !loading && (marcas.map(marca => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={marca.id}
                    >
                      <TableCell>{marca.id}</TableCell>                
                      <TableCell>{marca.nome}</TableCell>
                      <TableCell className={classes.colAction}>
                        <IconButton
                          aria-label="Excluir"
                          className={classes.btDelete}
                          onClick={() => handleClickOpen(marca.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <Link to={'marca/'+ marca.id}>
                          <IconButton
                            aria-label="Editar"
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )))}

                  { loading && (
                    <TableRow
                      className={classes.tableRow}
                      hover
                    >
                      <TableCell colSpan={3} >
                        <div className={classes.loadingContent}>
                          <CircularProgress />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}

                  { (totalElements === 0 && !loading) && (
                    <TableRow
                      className={classes.tableRow}
                      hover
                    >
                      <TableCell colSpan={3} >
                        <div className={classes.loadingContent}>
                          <h5>Nenhum registro encontrado!</h5>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}


                  
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={totalElements}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={totalElements === 0 ? 0 : page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>

      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        keepMounted
        onClose={handleClose}
        open={open}
      >
        <DialogTitle id="alert-dialog-slide-title">{'Exclusão'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Deseja excluir esse registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleClose}
          >
            Não
          </Button>
          <Button
            color="primary"
            onClick={handleRemove}
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};



const useFetching = (dispatch, action) => {
  const array = [];
  useEffect(() => {
    dispatch(action);
  }, array)
}

MarcasTable.propTypes = {
  className: PropTypes.string
};

export default MarcasTable;
