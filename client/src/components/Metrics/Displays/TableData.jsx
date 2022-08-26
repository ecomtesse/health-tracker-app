import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DataRow = (props) => {
  const { row, handleDelete } = props
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {new Date(row.date).toLocaleDateString("en-AU")}
      </TableCell>
      <TableCell align="right">{row.weight}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="delete" color="error" onClick={() => handleDelete(row.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

const BasicTable = ({ userData, handleDelete, metric, metricInfo, capitalise }) => {
  // console.log(userData, metric)
  const reverseData = userData[metric].slice().reverse()
  const tableRows = reverseData.map((row) => {
    return (
      <DataRow key={row.id} row={row} handleDelete={handleDelete}/>
    )
  })

  return (
    <TableContainer component={Paper} sx={{ maxWidth: "md" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right" >{capitalise(metric)}&nbsp;({metricInfo[metric].unit})</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable