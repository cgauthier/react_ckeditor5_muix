import './Container.css';
import Control from "../components/Control";
import Content from "../components/Content";

function Container(props) {

    const {addData, handleClick} = props;

    return (
        <div className="Container">
            <Control handleClick={handleClick} />
            <Content addData={addData} />
        </div>
    );
}

export default Container;
