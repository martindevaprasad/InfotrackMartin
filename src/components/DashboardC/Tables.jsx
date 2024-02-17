import React, { useState } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem } from "../../redux/TableSlice";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import {
  TableFooter,
  TableHead,
  TablePagination,
  TextField
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

export function CustomTable({ data, highlightId }) {
  return (
    <TableContainer component={Paper}>
      <Table
        stickyHeader
        sx={{ minWidth: 500 }}
        aria-label="custom pagination table"
      >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              hover={true}
              key={row.id}
              style={{
                background: highlightId === row.id ? "#5137ee" : "inherit"
              }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.title}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.price}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.category}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CustomTable.propTypes = {
  data: PropTypes.array.isRequired,
  highlightId: PropTypes.string
};

export default function CustomPaginationActionsTable({
  selectedRowId,
  setSelectedRowId
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deletedDataID, setDeletedDataID] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const tableData = useSelector((state) =>
    state.data.items.filter((item) => !item.isDeleted)
  );

  const filteredData = tableData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setDeletedDataID(response.data.id);
          dispatch(deleteItem(response.data.id));

          toast("You deleted a row");
        }
      })
      .catch((error) => console.error("Error deleting:", error));
  };

  const handleSelect = (id) => {
    setSelectedRowId(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          label="Search"
          variant="filled"
          value={searchQuery}
          onChange={handleSearch}
          style={{
            width: "30%",
            margin: "10px 0",
            textAlign: "end",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: "9px"
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Select</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row) => (
                <TableRow
                  hover={true}
                  key={row.id}
                  style={{
                    background: selectedRowId === row.id ? "#5137ee" : "inherit"
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.title}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.price}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.category}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    <Button
                      sx={{
                        backgroundColor: "#775dfa",
                        color: "#fff",
                        textTransform: "none"
                      }}
                      onClick={() => handleSelect(row.id)}
                    >
                      Select
                    </Button>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    <Button
                      sx={{
                        backgroundColor: "#de342e",
                        color: "#fff",
                        textTransform: "none"
                      }}
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page"
                  },
                  native: true
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <ToastContainer />
    </>
  );
}
