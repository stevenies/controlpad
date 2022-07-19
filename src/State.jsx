import React from 'react';
import { doServerDispatch } from './websockets.js';

// Initial values for the application's global state data structures.
const initialState = {
	controls: {
		stopMotors: { "@class":"org.smn.controlpad.model.control.CPButton", label: "Stop Motors" },
		m1: { "@class":"org.smn.controlpad.model.control.CPMotor", speed: 0, forward: true },
		m2: { "@class":"org.smn.controlpad.model.control.CPMotor", speed: 0, forward: true },
		m3: { "@class":"org.smn.controlpad.model.control.CPMotor", speed: 0, forward: true },
		m4: { "@class":"org.smn.controlpad.model.control.CPMotor", speed: 0, forward: true },
		m1RunningLight: { "@class":"org.smn.controlpad.model.ui.CPLight", value: 0},
		m2RunningLight: { "@class":"org.smn.controlpad.model.ui.CPLight", value: 0 },
		m3RunningLight: { "@class":"org.smn.controlpad.model.ui.CPLight", value: 0 },
		m4RunningLight: { "@class":"org.smn.controlpad.model.ui.CPLight", value: 0 },
		toggle: { "@class":"org.smn.controlpad.model.control.CPToggle", value: 0 },
		toggleLight: { "@class":"org.smn.controlpad.model.ui.CPLight", value: 0 },
		slider: { "@class":"org.smn.controlpad.model.control.CPSlider", value: 0 },
		textEdit: { "@class":"org.smn.controlpad.model.ui.CPTextField", value: "Steve Nies" },
		textDisplay: { "@class":"org.smn.controlpad.model.ui.CPTextField", value: "" },
		multiTextEdit: { "@class":"org.smn.controlpad.model.ui.CPTextField", value: "Steve Nies, Sheri Nies" },
		multiTextDisplay: { "@class":"org.smn.controlpad.model.ui.CPTextField", value: "" }
	}
};

// Useful accessor methods for accessing key global state information fields.
export const getControl = (state, id) => state.controls[id];

// Uses the command pattern to update the application's global state via command objects dispatched by application UI controls.
// The following code illustrates dispatching a state update command:
//
// const { state, dispatch } = useContext(AppContext);
// const setMotorSpeed = (speed) => {
//   dispatch({ id: props.id, fields: { speed: speed }, updateServer: false })
// };
//
const reducer = (state, command) => {
	
	// Don't update the state if the command references an invalid control property
	if (!(command.id in state.controls)) {
		return state;
	}
			
	// Update the control's state
	const updatedControl = { ...state.controls[command.id], ...command.fields };
	
	// Inform the controlPad server
	if (command.updateServer) {
		const message = { control: { id: command.id, ...updatedControl } };
		doServerDispatch(message);
	}
	
	// Update the system state
	let controlList = { ...state.controls };
	controlList[command.id] = updatedControl;
	return { ...state, controls: controlList }
};

// Create the application's global context providing access to both the application's state and command dispatch funtion.
// UI components lower in the composition hierarchy can access the state data structure and/or dispatch function by including
// the following code:  const { state, dispatch } = useContext(AppContext);
//
export const AppContext = React.createContext();
export function AppContextProvider(props) {

	const [state, dispatch] = React.useReducer(reducer, {...initialState});
	const value = { state, dispatch };

	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	);
}

