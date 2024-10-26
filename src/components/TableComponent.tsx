import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import Paper from '@mui/material/Paper';

interface Data {
  imdbID: string;
  Title: string;
  Year: string;
  Poster?: string;
  Type?:string;
}

interface Column {
  id: string;
  numeric: boolean;
  label: string;
}

interface TableComponentProps {
  rows: Data[];
  page: number;
  headCells: Column[];
  rowsPerPage: number;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRowClick: (row: Data) => void;
}
const TableComponent: React.FC<TableComponentProps> = ({
  rows,
  page,
  rowsPerPage,
  headCells,
  onChangePage,
  onChangeRowsPerPage,
  onRowClick,
}) => {
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('Title');
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const handleRequestSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = React.useMemo(() => {
    return [...rows].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
   
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;
  
      if (orderBy === 'Year') {
        return order === 'asc' ? parseInt(aValue) - parseInt(bValue) : parseInt(bValue) - parseInt(aValue);
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return 0;
    });
  }, [rows, orderBy, order]);
  
  return (
    <Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%', mb: 2, boxShadow: 'unset', bgcolor: '#1e1e1e' }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sx={{ color: 'white' }}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    sx={{ color: 'white' }}
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => handleRequestSort(headCell.id as keyof Data)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
        {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
          <TableRow key={row.imdbID} onClick={() => onRowClick(row)} sx={{ cursor: 'pointer', color: 'white' }}>
            <TableCell sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                {imageError[row.imdbID] || !row.Poster ? (
                  <div style={{ width: 50, height: 75, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#444', color: 'white' }}>
                    No image found
                  </div>
                ) : (
                  <img 
                    src={row.Poster} 
                    alt={row.Title} 
                    style={{ width: 50, height: 75, marginRight: 8 }} 
                    onError={() => setImageError((prev) => ({ ...prev, [row.imdbID]: true }))} 
                  />
                )}
                {row.Title}
              </TableCell>

            <TableCell align="right" sx={{ color: 'white' }}>{row.Year}</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>{row.imdbID}</TableCell>
          </TableRow>
        ))}
      </TableBody>


        </Table>
      </TableContainer>
      <TablePagination
        sx={{ color: 'white' }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </Paper>
  </Box>
  );
};

export default TableComponent;
