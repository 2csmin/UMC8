import React from "react";
import Button from './Button';
import { useCount } from "../context/CounterProvider";

const ButtonGroup = () => {
    const { handleIncrement, handleDecrement } = useCount();

    return (
        <div>
            <Button onClick={handleIncrement} text='+1'/>
            <Button onClick={handleDecrement} text='-1'/>
        </div>
    );
};

export default ButtonGroup;