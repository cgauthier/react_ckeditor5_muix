import './Footer.css';
import {Button} from "@mui/material";


function Footer(props) {
    return (
        <div className="Footer">
            <Button
                color="primary"
                variant="contained"
                onClick={props.handleChange}
            >Load Data Into CKEditor</Button>
        </div>
    );
}

export default Footer;
