import { createStore, compose, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';

//Import the root reducer
import rootReducer from './reducers/index';

//Create an object for the default data
const defaultState = {
	map: {
		olMap: null,
		defaultZoom: null
	},
	menu: {
		places: [],
		selected: null,
	}
};

//Extension which provides a connection whith the redux chrome dev tools
const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

const store = createStore(rootReducer, defaultState, compose(applyMiddleware(thunkMiddleware),devTools));

//this is a functionality of webpack and its modules
if(module.hot){
	module.hot.accept('./reducers/', ()=>{

		// this is used the commonJs sintax because the ES6 modules can't be loded inside of a funciton
		const nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer);
	});
}

export default store;
