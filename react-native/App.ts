// Entry point for mobile (used by Expo)
import App from './src/App';
import React, { Component } from 'react';
import Firebase, {FirebaseContext} from './src/Firebase';
export default class MainApp extends React.Component {
	render() {
		return (
			// <FirebaseContext.Provider value={new Firebase()}>
				<App/>
			// </FirebaseContext.Provider>
		);
	}
}