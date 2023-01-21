import { AppBar, Tab, Tabs, Toolbar } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles, withStyles } from "@mui/styles"
import { redirect } from '../../utils/urlUtils';

const locationToTab = {
    "/customers": "Customers",
    "/products": "Products"
}

const tabToLocation = {
    "Customers": "/customers",
    "Products": "/products",
}

const useStyles = makeStyles({
    toolbar: {
        backgroundColor: "#f99aaa",
        padding: 20,
    },
})

const CustomTabs = withStyles((theme) => ({
    indicator: {
        borderRadius: 4,
        padding: 1,
        backgroundColor: '#fdb4bf !important',
    },
    root: {
        '& .MuiTab-root': {
            color: '#ffccdc2',
            fontSize: "1.3rem",
            textDecoration: "bold",
        },
        '& .Mui-selected': {
            fontSize: "1.3rem",
            color: '#ffcdd4 !important',
        },
    },

}))(Tabs);


function Header() {

    const classes = useStyles()
    const location = useLocation()
    const defaultTab = locationToTab[location.pathname]
    const [tab, setTab] = useState(defaultTab)

    function handleChange(event, newTab) {
        setTab(newTab)
        redirect(tabToLocation[newTab])
    }

    return (
        <AppBar position='static' color='default'>
            <Toolbar className={classes.toolbar} >
                <CustomTabs value={tab} onChange={handleChange}>
                    <Tab label="Customers" value={"Customers"} />
                    <Tab label="Products" value={"Products"} />
                </CustomTabs>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
