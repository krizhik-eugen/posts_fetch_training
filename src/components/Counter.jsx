import React from 'react';
const Counter = () => {
    const [count, setCount] = React.useState(0)
    const increment = () => {
        setCount(prevState => prevState + 1)
    }
    const decrement = () => {
        setCount(prevState => prevState - 1)
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={decrement}>decrement</button>
            <button onClick={increment}>increment</button>

        </div>
    );
};

export default Counter;