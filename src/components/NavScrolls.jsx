import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Nav, Navbar,Container,Form,FormControl,Button} from 'react-bootstrap';
import {Link } from 'react-router-dom'
import { logout, reset } from "../features/authSlice";

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useDispatch ,useSelector} from "react-redux"


import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import LogoutIcon from '@mui/icons-material/Logout';

import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

const Menus=()=>{
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClickListItem = (event) => {
setAnchorEl(event.currentTarget);
};

const handleClose = () => {
setAnchorEl(null);
};
const {user} = useSelector((state) =>state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();
const LogOutFunction=()=>{
localStorage.removeItem("CC_Token")
dispatch(reset());
dispatch(logout())
.then(() => {
navigate("/login");
});
}

return(
<>
<Navbar bg="primary" variant="dark">
<Container>
<Navbar.Brand >
<Stack direction="row" spacing={2}>
<ListItem
button
id="lock-button"
aria-haspopup="listbox"
aria-controls="lock-menu"
aria-label={<Avatar alt={user.email} src={user.avatar} />}
aria-expanded={open ? 'true' : undefined}
onClick={handleClickListItem}
>

<ListItemText
primary={<Avatar alt={user.email} src={user.avatar} />}
secondary={user.email}
/>
</ListItem>
<Menu
id="lock-menu"
anchorEl={anchorEl}
open={open}
onClose={handleClose}
MenuListProps={{
'aria-labelledby': 'lock-button',
role: 'listbox',
}}
>
<MenuItem
onClick={() => {}}
>
<AccountCircleIcon />
Profile
</MenuItem>
<MenuItem
onClick={() => {}}
>
<SettingsApplicationsIcon />
Settings
</MenuItem>
<MenuItem
onClick={() => LogOutFunction()}
>
<LogoutIcon />
Logout
</MenuItem>
</Menu>
</Stack>
</Navbar.Brand>
<Nav className="me-auto">
<Nav.Link as={Link} to="/home">HOME</Nav.Link>
<Nav.Link as={Link} to="/categories">Catégories</Nav.Link>
<Nav.Link as={Link} to="/scategories">Sous Catégories</Nav.Link>
<Nav.Link as={Link} to="/articles">Liste des Articles</Nav.Link>

</Nav>
</Container>
<Form className="d-flex">
<FormControl
type="search"

placeholder="Search"
className="me-2"
aria-label="Search"
/>
<Button variant="success">Chercher</Button>
</Form>
</Navbar>


</>
)
}
export default Menus
