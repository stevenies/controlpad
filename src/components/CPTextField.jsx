import React, { useContext } from 'react';
import { IonItem, IonLabel, IonInput, IonTextarea } from '@ionic/react';
import { AppContext} from '../State.jsx';

/**
	UI component displaying one or more lines of text.
	Props:
		* id:	      Mnemonic used to refer the button control.
		* multiline:  (Optional) True if the text field can display multiple lines of text.  Default = false.
		* rows:		  (Optional) Number of rows to display simultaneously within a multiline component.  Default = 1.
		* editable:   (Optional) True if the user can edit the text; false if the text is only for display.  Default = false.
	State:
		* value:	 Text displayed with the TextField component.
*/
export function CPTextField(props) {

	const multiline = props.multiline == "true";
	const rows = props.rows ? props.rows : 1;
	const editable = props.editable == "true";

	const { state, dispatch } = useContext(AppContext);
	const value = state.controls[props.id].value;
	
	const labelStyle = { "padding-right": "8px" };
	const displayStyle = { };
	const editableStyle = { border: "1px solid black" };

	// Create a callback function that dispatches a command indicating the button was clicked.
	const saveEdits = (value) => {
		if (props.editable) {
			dispatch({ id: props.id, fields: { value: value }, updateServer: true });
		}
	};

	return (
		<IonItem lines="none">
			<IonLabel style={labelStyle}>{props.id}</IonLabel>
			{multiline
            	? (<IonTextarea value={value} readonly={!editable} rows={rows} onIonChange={e => saveEdits(e.detail.value)} style={editable ? editableStyle : displayStyle}></IonTextarea>)
            	: (<IonInput value={value} readonly={!editable} onIonChange={e => saveEdits(e.detail.value)} style={editable ? editableStyle : displayStyle}></IonInput>)
			}
		</IonItem>
    );
}
