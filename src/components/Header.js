import './Header.css';
import {Typography} from "@mui/material";


function Header() {
    return (
        <div className="Header">
            <Typography
                variant="h2"
                color="textPrimary"
                gutterBottom
                component="h1"
            >React / CKEditor5 / MUI-X Tree Grid Demo</Typography>
        </div>
    );
}

export default Header;
