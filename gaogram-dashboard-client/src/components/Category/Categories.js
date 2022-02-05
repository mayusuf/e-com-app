import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useCategoriesData from '../../hooks/categoryData';
import { Button, TablePagination, Tooltip } from '@mui/material';
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: "#2196f3",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];


const Categories = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const categories = useCategoriesData({})
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="center">Category Name</StyledTableCell>
                        <StyledTableCell align="center">Category Description</StyledTableCell>
                        <StyledTableCell align="center">Update Date</StyledTableCell>
                        <StyledTableCell align="center">Is Active</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : categories
                    ).map((category) => (
                        <StyledTableRow key={category.cat_id}>
                            <StyledTableCell component="th" scope="row">
                                {category.cat_id}
                            </StyledTableCell>
                            <StyledTableCell align="center">{category.cat_name}</StyledTableCell>
                            <StyledTableCell align="center">{category.cat_desc}</StyledTableCell>
                            <StyledTableCell align="center">{category.update_date.slice(0, 19).replace('T', ', ')}</StyledTableCell>
                            <StyledTableCell align="center">{category.is_active === 1 ? "Active" : "Not Active"}</StyledTableCell>
                            <StyledTableCell align="center"><Tooltip title="Update">
                                <Button component={Link} to={`/category/update/${category.cat_id}`}>
                                    <AiFillEdit size={24} />
                                </Button>
                            </Tooltip></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={categories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default Categories;