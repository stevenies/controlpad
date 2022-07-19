import React, { useContext } from 'react';
import { IonButton } from '@ionic/react';
import { AppContext} from '../State.jsx';

/**
	UI component providing a clickable UI button without any state of its own.
	Props:
		* id:	  Mnemonic used to refer the button control.
	State:
		* label:  Text displayed as a label within the button.
*/
export function CPButton(props) {

	const { state, dispatch } = useContext(AppContext);
	const label = state.controls[props.id].label;

	// Create a callback function that dispatches a command indicating the button was clicked.
	const clickHandler = () => {
		dispatch({ id: props.id, fields: {}, updateServer: true });
	};

	return (
 		<IonButton onClick={() => clickHandler()}>{label}</IonButton>
    );
}
