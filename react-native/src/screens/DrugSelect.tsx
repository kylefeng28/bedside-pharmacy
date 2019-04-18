import React from 'react';
import ReactDOM from 'react-dom';
import { ClassList } from './ClassList';
import { DrugList } from './DrugList';
import { Compare } from './Compare';
// import { Provider } from 'react-redux';
// import createStore from './createReduxStore';

// const store = createStore();
// const rootElement = document.getElementById('root');

export class DrugSelect {

    state:{
        items: any[];
    }

    constructor(props) {
        // console.log(props);
    
        this.state = {
          data:[],
        };
    }

    render() {
        return (
            <ClassList/>
            <DrugList/>
            <Compare/>
            // <Container>

            // </Container>
        );
    }

    // ReactDOM.render((
    //     <Provider store={store}>
    //       <AppRootComponent />
    //     </Provider>
    //   ), rootElement);
    
}