import { AppBar, Tab, Tabs, Toolbar } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { redirect } from '../../utils/urlUtils';

const locationToTab = {
    "/customers": "Customers",
    "/products": "Products"
}

const tabToLocation = {
    "Customers": "/customers",
    "Products": "/products",
}



function Header() {

    const location = useLocation()
    const defaultTab = locationToTab[location.pathname]
    const [tab, setTab] = useState(defaultTab)

    function handleChange(event, newTab) {
        setTab(newTab)
        redirect(tabToLocation[newTab])
    }

    return (
        <AppBar position='static' color='transparent'>
            <Toolbar >
                <Tabs value={tab} onChange={handleChange}>
                    <Tab label="Customers" value={"Customers"} />
                    <Tab label="Products" value={"Products"} />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
