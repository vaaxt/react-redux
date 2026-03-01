import {useSelector, useDispatch} from "react-redux";
import { increment, decrement, reset } from "../features/counter/counterSlice";
import { useState } from "react";

const Counter = () => {
    const dispatch = useDispatch();
    const {value, color} = useSelector(state => state.counter);
    const [animate, setAnimate] = useState(false);

    const handleIncrement = () => {
        dispatch(increment());
        setAnimate(true);

        setTimeout(()=>{
            setAnimate(false);
        }, 300);
    };


    return(
        <div
        style={{
            backgroundColor: color,
            padding: "40px",
            textAlign: "center",
            minHeight: "60vh",
            transition: "background-color 0.5s ease"
            
        }}
        >
            <h1
            style={{
                transform: animate ? "traslateY(-20px)": "translateY(0px)",
                transition: "transform 0.2s ease",
            }}
            >Счетчик: {value}</h1>

            <button onClick={handleIncrement}>Вперед</button>
            {/* <button onClick={()=> dispatch(increment())} >+</button> */}
            <button onClick={()=> dispatch(decrement())} style={{margin: '10px'}}>-</button>
            <button onClick={()=> dispatch(reset())}>Очистить</button>
        </div>
    );
};

export default Counter;

