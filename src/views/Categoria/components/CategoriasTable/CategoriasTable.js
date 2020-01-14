import React, { useState,  useEffect } from 'react';
import { useSelector,  useDispatch } from 'react-redux';

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
  Grid
} from '@material-ui/core';
import {
  Search
} from '@material-ui/icons';

import { Creators as actions } from './../../../../store/actions/categoria';

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
  }

}));

const CategoriasTable = props => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const dispatch = useDispatch();
  useFetching(dispatch, actions.buscaCategorias(page, rowsPerPage, order, orderBy));

  const categorias = useSelector( state  => state.categoria.data );
  //const totalPages = useSelector( state  => state.categoria.totalPages );
  //const itemsCountPerPage = useSelector( state  => state.categoria.itemsCountPerPage );
  const totalElements = useSelector( state  => state.categoria.totalElements );

  const { className, ...rest } = props;

  const classes = useStyles();  

  const handlePageChange = (event, page) => {
    setPage(page);
    dispatch(actions.buscaCategorias(page, rowsPerPage, order, orderBy),[])
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
    dispatch(actions.buscaCategorias(page, event.target.value, order, orderBy),[])
  };

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
    dispatch(actions.buscaCategorias(page, rowsPerPage, order, orderBy),[])
  }

  const headCells = [
    { id: 'id', numeric: false, disablePadding: false, label: 'Codigo' },
    { id: 'descricao', numeric: false, disablePadding: false, label: 'Nome' }   
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

  const SearchPanel = () => {
    const handleChange = event => {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    };
 
    return (
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <form
          autoComplete="off"
          noValidate
        >
          <CardHeader
            subheader="Pesquisar"
            title="Categoria"
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
                  label="Descrição"
                  margin="dense"
                  name="descricao"
                  onChange={handleChange}
                  required
                  value={values.descricao}
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
                  aria-label="add"
                  color="primary"
                >
                  <Search />
                </Fab>
              </Grid>              
            </Grid>
          </CardContent>
        </form>
      </Card>
    );
  }
 
  return (
    <div>
      <SearchPanel/>
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
                  {categorias.map(categoria => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={categoria.id}
                    >
                      <TableCell>{categoria.id}</TableCell>                
                      <TableCell>{categoria.descricao}</TableCell>
                    </TableRow>
                  ))}
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
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
    </div>
  );
};

const useFetching = (dispatch, action) => {
  const array = [];
  useEffect(() => {
    dispatch(action);
  }, array)
}

CategoriasTable.propTypes = {
  className: PropTypes.string
};

export default CategoriasTable;
