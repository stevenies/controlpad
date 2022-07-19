import React, { useContext } from 'react';
import { AppContext} from '../State.jsx';

/**
	UI component displaying a color corresponding with the component's current state.
	Props:
		* id:	   Mnemonic used to refer the light indicator.
		* colors:  (Optional) A custom array (zero-based) mapping numbers to colors.
	State:
		* value:  Indicates the color to be displayed.  By default the following colors are defined:
		*		  - Green = 0
		*		  - Yellow = 1
		*		  - Red = 2
		*		  Other colors are supported by specifying a custom array of colors via the "styles" prop.
*/
export function CPLight(props) {

	const { state, dispatch } = useContext(AppContext);
	const value = state.controls[props.id].value;

	const defaultColors = [
		"#adebad",	// GREEN (value: 0)
		"#ffd700",	// YELLOW (value: 1)
		"#ff8080"	// RED (value: 2)
	];
	const defaultStyle = { display: "inline-block", width: "20px", height: "20px", margin: "2px" };

	const getStyle = (value) => {
		const colors = props.colors ? props.colors : defaultColors;
		return value < 0 || value > colors.length ? "" : { ...defaultStyle, "backgroundColor": colors[value] };
	}

	return (
 		<div style={getStyle(value)} />
    );
}
