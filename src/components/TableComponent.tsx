import React, { useState, useMemo } from 'react';
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
import { useMediaQuery } from '@mui/material';

interface Data {
  imdbID: string;
  Title: string;
  Year: string;
  Poster?: string;
  Type?: string;
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
  totalCount: number;
}

const TableComponent: React.FC<TableComponentProps> = ({
  rows,
  page,
  rowsPerPage,
  headCells,
  totalCount,
  onChangePage,
  onChangeRowsPerPage,
  onRowClick
}) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('Title');
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleRequestSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = useMemo(() => {
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
              {sortedRows.map((row) => (
                <TableRow key={row.imdbID} onClick={() => onRowClick(row)} sx={{ cursor: 'pointer', color: 'white' }}>
                  <TableCell sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                    {imageError[row.imdbID] || !row.Poster ? (
                      <div style={{ paddingLeft: 2, marginRight: 4, width: 50, height: 75, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#444', color: 'white' }}>
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
                    <div style={{ maxWidth: isMobile ? 250 : 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {row.Title}
                    </div>
                  </TableCell>

                  <TableCell align="right" sx={{ color: 'white' }}>{row.Year}</TableCell>
                  <TableCell align="right" sx={{ color: 'white' }}>{row.imdbID}</TableCell>
                  <TableCell align="right" sx={{ color: 'white' }}>
                    <Box sx={{ bgcolor: '#273d8bba', borderRadius: 4, p: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                      {row.Type}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ color: 'white' }}
          rowsPerPageOptions={[]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default TableComponent;
