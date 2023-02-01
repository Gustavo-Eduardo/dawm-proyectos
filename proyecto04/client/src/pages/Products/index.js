
import { Box, Button, ButtonGroup, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/products";


function ProductsTable({ products }) {

  return <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell> Code </TableCell>
          <TableCell align="right"> Description </TableCell>
          <TableCell align="right"> Stock </TableCell>
          <TableCell align="right"> Price </TableCell>
          <TableCell align="right"> Vendor </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow
            key={product._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {product.code}
            </TableCell>
            <TableCell align="right">{product.stock}</TableCell>
            <TableCell align="right">{`${product.price}`}</TableCell>
            <TableCell align="right">{product.vendor}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}

function Products() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalItems, setTotalItems] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit, setLimit] = useState(10)

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getProducts(page, limit)
      const metadata = response.meta
      setProducts(response.data)
      setTotalItems(metadata.totalItems)
      setTotalPages(metadata.totalPages)
      if (page > metadata.totalPages) {
        setPage(1)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    }

  }, [limit, page])

  useEffect(() => {
    loadProducts()
  }, [page, limit, loadProducts])


  return (
    <div>
      {!products.length ? <h1> Loading </h1> : (<Box sx={{ opacity: loading ? "50%" : "100%" }}>
        <ProductsTable products={products} />
        <Box display={"flex"} margin={2} justifyContent={"flex-end"} alignItems={"center"}>
          <Typography sx={{ mr: 1 }}>
            {`Items/page: `}
          </Typography>
          <Select value={limit} onChange={(ev) => {
            setLimit(ev.target.value)
          }} sx={{ mr: 5 }}>
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

export default Products;
