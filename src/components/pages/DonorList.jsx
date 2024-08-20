import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";

const DonorList = ({ paginatedRows, count, rowsPerPage, page,handleChangePage,handleChangeRowsPerPage  }) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: {md:'200px', sm:'180px', xs:'140px'}, overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="donor table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>District</TableCell>
              <TableCell>Blood Group</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.district}</TableCell>
                <TableCell>{row.bloodGroup}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default DonorList;
