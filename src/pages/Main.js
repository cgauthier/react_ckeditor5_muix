import React, { useState } from 'react';
import './Main.css';
import Header from "../components/Header";
import Container from "../components/Container";
import Footer from "../components/Footer";

function Main(props) {

    const [addData, setData] = useState("");

    const handleChange = (e, editor) => {
        const data = "<h1>Hello World</h1>";
        setData(data);
    }

    const handleClick = (data) => {
        setData(data);
    }

    return (
        <div className="Main">
            <Header />
            <Container handleClick={handleClick} addData={addData} />
            <Footer handleChange={handleChange} />
        </div>
    );
}

export default Main;
