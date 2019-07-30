import React from 'react';
import './App.css';
import TodoListContainer from "./components/TodoListContainer";
import Wrapped from "./components/Wrapped/Wrapped";

class App extends React.Component {

    render() {
        return (
            <Wrapped>
                <TodoListContainer/>
            </Wrapped>
        );
    }
}

export default App;
