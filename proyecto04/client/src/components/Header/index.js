
import { AppBar, Box, Button, Toolbar } from '@mui/material';

function Header() {
    return (<AppBar position="static">
        <Toolbar>
            <Box gap={3} >
                <Button color="inherit">Customers</Button>
                <Button color="inherit">Products</Button>
            </Box>
        </Toolbar>
    </AppBar>)

}

export default Header