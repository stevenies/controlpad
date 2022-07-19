import React, { useContext } from 'react';
import { IonRange, IonLabel } from '@ionic/react';
import { AppContext} from '../State.jsx';

/**
	UI component for selecting a value from a possible range of values.
	Props:
		* id:		 Mnemonic used to refer the motor control.
		* minValue:  (Optional) Slider lower range value; default = 0.
		* maxValue:  (Optional) Slider maximum range value; default = 100.
	State:
		* value:	 Currently selected range value.
 */
export function CPSlider(props) {

	const minValue = props.minValue ? props.minValue : 0;
	const maxValue = props.maxValue ? props.maxValue : 100;

	const { state, dispatch } = useContext(AppContext);
	const value = state.controls[props.id].value;

	const styledIonRange = {
		"--bar-height": "8px",
		"--bar-border-radius": "8px",
		"--bar-background": "#e8e8e8",
		"--bar-background-active": "#e8e8e8",
		"--knob-background": "darkblue",
		"--knob-size": "30px",
		"--pin-background": "#ffafcc",
		"--pin-color": "#fff"
	};

	// Create a callback function that dispatches a command to update the slider's current value.
	const setMotorSpeed = (value) => {
		dispatch({ id: props.id, fields: { value: value }, updateServer: true });
	};

	return (
		<IonRange min={minValue} max={maxValue} debounce={100} value={value} onIonChange={e => setMotorSpeed(e.detail.value)} style={styledIonRange} >
			<IonLabel slot="start">{props.id}</IonLabel>
		</IonRange>
    );
}
