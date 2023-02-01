import { Box, Button, ButtonGroup, Checkbox, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { calculateTotal, getOrders } from "../../services/orders";


function OrdersTable({ orders }) {



    const [selectedOrders, setSelectedOrders] = useState([])
    const [total, setTotal] = useState(null)

    const handleCalculate = async () => {
        const { total: totalPrice } = await calculateTotal(selectedOrders)
        setTotal(totalPrice)
    }


    const createChangeHandler = (changedOrder) => (ev) => {
        if (ev.target.checked) {
            setSelectedOrders(orders => [...orders, changedOrder])
        } else {
            setSelectedOrders(orders => orders.filter(order => order._id.toString() !== changedOrder._id.toString()))
        }
    }

    return <Box>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell> Product code </TableCell>
                        <TableCell align="right"> Quantity ordered </TableCell>
                        <TableCell align="right"> Price each </TableCell>
                        <TableCell align="right"> Product Name </TableCell>
                        <TableCell align="right">
                            Select
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow
                            key={order._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {order.productCode}
                            </TableCell>
                            <TableCell align="right">{order.quantityOrdered}</TableCell>
                            <TableCell align="right">{order.priceEach}</TableCell>
                            <TableCell align="right">{`${order.productName}`}</TableCell>
                            <TableCell align="right">
                                <Checkbox checked={!!selectedOrders.find(selectedOrder => selectedOrder._id.toString() === order._id.toString())} onChange={createChangeHandler(order)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Box sx={{ mt: 3 }} display={"flex"} alignItems="center">
            <Typography sx={{ mr: 2 }}>
                Calculate total price for selected orders
            </Typography>
            <Button variant="contained" color="secondary" disabled={!selectedOrders.length} onClick={handleCalculate}> Calculate </Button>
            {total && <Typography>
                {`The total is ${total}`}
            </Typography>}

        </Box>

    </Box>
}

function Orders({ customerId }) {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [limit, setLimit] = useState(10)


    const loadOrders = useCallback(async () => {
        try {
            setLoading(true)
            const response = await getOrders(customerId, page, limit)
            const metadata = response.meta
            setOrders(response.data)
            setTotalItems(metadata.totalItems)
            setTotalPages(metadata.totalPages)
            if (page > metadata.totalPages) {
                setPage(1)
            }
            setLoading(false)
        } catch (error) {
            console.error(error)
        }

    }, [customerId, limit, page])

    useEffect(() => {
        loadOrders()
    }, [page, limit, loadOrders])


    return (
        <div>
            {!orders.length ? <h1> Loading </h1> : (<Box sx={{ opacity: loading ? "50%" : "100%" }}>
                <OrdersTable orders={orders} />
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

export default Orders;
