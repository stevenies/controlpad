import React, { useContext } from 'react';
import { IonRange, IonLabel } from '@ionic/react';
import { AppContext} from '../State.jsx';

/**
	UI component for controlling a motor's speed and direction.
	Props:
		* id:				Mnemonic used to refer the motor control.
		* unidirectional:	(Optional) When true motor is commanded to spin in a forward direction only.
		* showMotorStatus:	(Optional) When true slider channel is colored green when motor is quiesent, red when motor is spinning.
							Otherwise slider channel is colored grey.
	State:
		* speed:	Number between 0 to 127 indicating how fast the motor should spin (0 = off; 127 = full speed).
		* forward:	True if the motor should spin in a forward direction; false if the motor should spin backwards.
 */
export function CPMotor(props) {

	const showMotorStatus = props.showMotorStatus;
	const rangeMinValue = props.unidirectional === "true" ? 0 : -127;
	const rangeMaxValue = 127;

	const { state, dispatch } = useContext(AppContext);
	const forward = state.controls[props.id].forward;
	const speed = forward ? state.controls[props.id].speed : -state.controls[props.id].speed;

	const styledIonRangeDefault = {
		"--bar-height": "8px",
		"--bar-border-radius": "8px",
		"--bar-background": "#e8e8e8",
		"--bar-background-active": "#e8e8e8",
		"--knob-background": "darkblue",
		"--knob-size": "30px",
		"--pin-background": "#ffafcc",
		"--pin-color": "#fff"
	};
	const styledIonRangeGreen = { ...styledIonRangeDefault, "--bar-background": "#adebad", "--bar-background-active": "#adebad" };
	const styledIonRangeRed = { ...styledIonRangeDefault, "--bar-background": "#ff8080", "--bar-background-active": "#ff8080" };
	const ionRangeStyle = showMotorStatus ? speed === 0 ? styledIonRangeGreen : styledIonRangeRed : styledIonRangeDefault;

	// Create a callback function that dispatches a command to update the motor's speed.
	const setMotorSpeed = (speed) => {
		const forward = speed >= 0;
		dispatch({ id: props.id, fields: { speed: Math.abs(speed), forward: forward }, updateServer: true });
	};

	return (
		<IonRange style={ionRangeStyle} min={rangeMinValue} max={rangeMaxValue} debounce={100} value={speed} onIonChange={e => setMotorSpeed(e.detail.value)}>
			<IonLabel slot="start">{props.id}</IonLabel>
		</IonRange>
    );
}
