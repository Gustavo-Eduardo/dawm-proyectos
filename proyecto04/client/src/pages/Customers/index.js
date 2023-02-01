import { Box, Button, ButtonGroup, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCustomers } from "../../services/customers";


function CustomersTable({ customers }) {

  return <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell> Id </TableCell>
          <TableCell align="right"> Customer Name </TableCell>
          <TableCell align="right"> Contact Name </TableCell>
          <TableCell align="right"> Phone </TableCell>
          <TableCell align="right"> Orders </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {customers.map((customer) => (
          <TableRow
            key={customer.customerNumber}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {customer.customerNumber}
            </TableCell>
            <TableCell align="right">{customer.customerName}</TableCell>
            <TableCell align="right">{`${customer.contactFirstName} ${customer.contactLastName}`}</TableCell>
            <TableCell align="right">{customer.phone}</TableCell>
            <TableCell align="right">
              <Button>
                Customer Orders
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}

function Customers() {

  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalItems, setTotalItems] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit, setLimit] = useState(10)

  async function loadCustomers() {
    try {
      setLoading(true)
      const response = await getCustomers(page, limit)
      const metadata = response.meta
      setCustomers(response.data)
      setTotalItems(metadata.totalItems)
      setTotalPages(metadata.totalPages)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }

  }

  useEffect(() => {
    loadCustomers()
  }, [page, limit])


  return (
    <div>
      {!customers.length ? <h1> Loading </h1> : (<Box sx={{ opacity: loading ? "50%" : "100%" }}>
        <CustomersTable customers={customers} />
        <Box display={"flex"} margin={2} justifyContent={"flex-end"} alignItems={"center"}>
          <Typography sx={{ mr: 1 }}>
            {`Items/page: `}
          </Typography>
          <Select value={limit} onChange={(ev) => { setLimit(ev.target.value) }} sx={{ mr: 5 }}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
          <Typography sx={{ mr: 5 }}>
            {`Page: ${page} - ${totalPages}`}
          </Typography>
          <ButtonGroup sx={{ mr: 5 }}>
            <Button disabled={page <= 1} onClick={() => { setPage(p => --p) }}>
              Previous
            </Button>
            <Button disabled={page >= totalPages} onClick={() => { setPage(p => ++p) }}>
              Next
            </Button>
          </ButtonGroup>
          <Typography>
            {`Total: ${totalItems}`}
          </Typography>

        </Box>
      </Box>
      )}
    </div>
  );
}

export default Customers;
