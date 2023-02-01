import { Dialog } from "@mui/material"
import { Box } from "@mui/system"
import { useImperativeHandle, useState } from "react"
import { forwardRef } from "react"
import Orders from "../Orders"




function OrdersDialog({ customerId }, ref) {

    const [open, setOpen] = useState(false)

    useImperativeHandle(
        ref,
        () => ({
            open: () => { setOpen(true) }
        }),
    )

    return <Dialog open={open} onClose={() => { setOpen(false) }} fullWidth>
        <Box padding={4}>
            <Orders customerId={customerId} />
        </Box>

    </Dialog>
}

export default forwardRef(OrdersDialog)