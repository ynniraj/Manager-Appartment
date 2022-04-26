import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { setProducts } from "../Redux/DataApi/action";
import { useDispatch, useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ShowTable() {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTableData = useSelector((store) => store.getDataReducer.products);

  useEffect(() => {
    handlePagination();
  }, [count]);

  const handleView = (id) => {
    localStorage.setItem("viewid", id);
    navigate("/viewresidents");
  };

  const handlePagination = () => {
    axios
      .get(`https://appartment-project.herokuapp.com/getFlatspagination?page=${count}&limit=3`)
      .then((response) => {
        console.log(response.data);
        dispatch(setProducts(response.data.pageData));
        // setTableData(response.data.pageData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleHighSort = () => {
    axios
      .get(`https://appartment-project.herokuapp.com/highsortedflat?page=${count}&limit=3`)
      .then((response) => {
        console.log(response.data);
        // setTableData(response.data.pageData);
        dispatch(setProducts(response.data.pageData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlelowSort = () => {
    axios
      .get(`https://appartment-project.herokuapp.com/lowsortedflat?page=${count}&limit=3`)
      .then((response) => {
        console.log(response.data);
        // setTableData(response.data.pageData);
        dispatch(setProducts(response.data.pageData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmitBlock = (e) => {
    e.preventDefault();
    axios
      .get(`https://appartment-project.herokuapp.com/blockname/${e.target.block.value}`)
      .then((response) => {
        console.log(response.data);
        // setTableData(response.data);
        dispatch(setProducts(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOwnerSort = () => {
    axios
      .get(`https://appartment-project.herokuapp.com/byflattype/Owner`)
      .then((response) => {
        console.log(response.data);
        dispatch(setProducts(response.data));

        // setTableData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleTenantSort = () => {
    axios
      .get(`https://appartment-project.herokuapp.com/byflattype/Tenant`)
      .then((response) => {
        console.log(response.data);
        // setTableData(response.data);
        dispatch(setProducts(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="m">
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmitBlock}
          sx={{
            mx: 2,
            mt: 3,
            mb: 3,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box>
            <TextField
              required
              fullWidth
              name="block"
              label="Search By Block Name"
              type="block"
              id="block"
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Submit
            </Button>
          </Box>
          <Box sx={{ mx: 5, px: 2 }}>
            <Button variant="contained" onClick={handleHighSort}>
              Sort High to Low
            </Button>
            <Button variant="contained" onClick={handlelowSort} sx={{ mx: 2 }}>
              Sort Low to High
            </Button>
          </Box>
          <Box sx={{ mx: 5, px: 2 }}>
            <Button variant="contained" onClick={handleOwnerSort}>
              Sort Owner
            </Button>
            <Button
              variant="contained"
              onClick={handleTenantSort}
              sx={{ mx: 2 }}
            >
              Sort Tenant
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell align="right">Type</StyledTableCell>
                <StyledTableCell align="right">Block</StyledTableCell>
                <StyledTableCell align="right">Flat No</StyledTableCell>
                <StyledTableCell align="right">View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getTableData.map((el) => (
                <StyledTableRow key={el._id}>
                  <StyledTableCell component="th" scope="el">
                    <img src={el.flatimg} alt="" style={{ width: "20%" }} />
                  </StyledTableCell>
                  <StyledTableCell align="right">{el.type}</StyledTableCell>
                  <StyledTableCell align="right">{el.block}</StyledTableCell>
                  <StyledTableCell align="right">{el.flatno}</StyledTableCell>
                  <StyledTableCell align="right">
                    {
                      <Button
                        variant="contained"
                        onClick={() => handleView(el._id)}
                      >
                        View
                      </Button>
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button variant="contained" onClick={() => setCount(count - 1)}>
            Prev
          </Button>
          <Button
            variant="contained"
            onClick={() => setCount(count + 1)}
            sx={{ mx: 3 }}
          >
            Next
          </Button>
        </Box>
      </Container>
    </>
  );
}
