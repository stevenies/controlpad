import React, { useContext } from 'react';
import { IonItem, IonToggle, IonLabel } from '@ionic/react';
import { AppContext} from '../State.jsx';

/**
	UI component providing a UI control with two state values - 0 or 1.
	Props:
		* id:		  Mnemonic used to refer the toggle control.
		* labelLeft:  (Optional) Text displayed to the left of the toggle.
		* labelLeft:  (Optional) Text displayed to the right of the toggle.
	State:
		* value:	  Toggle state, either 0 (off) or 1 (on)
*/
export function CPToggle(props) {

	const { state, dispatch } = useContext(AppContext);
	const value = state.controls[props.id].value;
	
	const styleItem = { display: "inline-block", width: "fit-content" };
	const styleLabelLeft = props.labelLeft ? {} : { display: "none" };
	const styleToggle = { width: "40px" };
	const styleLabelRight = props.labelRight ? { marginLeft: "0px" } : { display: "none" };

	// Create a callback function that dispatches a command indicating the toggle was clicked.
	const clickHandler = (checked) => {
		dispatch({ id: props.id, fields: {value: checked ? 1 : 0}, updateServer: true });
	};

	return (
		<IonItem lines="none" style={styleItem}>
			<IonLabel style={styleLabelLeft}>{props.labelLeft}</IonLabel>
			<IonToggle checked={value === 1} onIonChange={e => clickHandler(e.detail.checked)} style={styleToggle} />
			<IonLabel slot="end" style={styleLabelRight}>{props.labelRight}</IonLabel>
		</IonItem>
    );
}
