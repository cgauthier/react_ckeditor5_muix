import './Control.css';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
// import {makeStyles} from "@material-ui/core";


function Control(props) {

    const handleClick = props.handleClick;

    return (
        <div className="Control">
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            >
                <TreeItem nodeId="1" label="Applications">
                    <TreeItem
                        nodeId="2"
                        label="Calendar"
                        onClick={() => handleClick("calendar")}
                    />
                </TreeItem>
                <TreeItem nodeId="5" label="Documents">
                    <TreeItem nodeId="10"
                              label="OSS"
                              onClick={() => handleClick("OSS")}
                    />
                    <TreeItem nodeId="6" label="MUI">
                        <TreeItem
                            nodeId="8"
                            label="index.js"
                            onClick={() => handleClick("index")}
                        />
                    </TreeItem>
                </TreeItem>
            </TreeView>
        </div>
    );
}

export default Control;
