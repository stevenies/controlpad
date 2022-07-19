import React, { useContext, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { connectServer, disconnectServer } from "../websockets.js";
import { AppContext } from '../State';
import { CPButton } from '../components/CPButton.jsx';
import { CPLight } from '../components/CPLight.jsx';
import { CPMotor } from '../components/CPMotor.jsx';
import { CPSlider } from '../components/CPSlider.jsx';
import { CPTextField } from '../components/CPTextField.jsx';
import { CPToggle } from '../components/CPToggle.jsx';

export function Home() {

	const { state, dispatch } = useContext(AppContext);

	// Establish a STOMP network connection to the ControlPad server.  Note that the useEffect function specifies an empty array
	// so that the connection is established only when the component is first mounted and then later disconnected when the component
	// is unmounted.  Changes in the component's intermediate state are ignored.
	useEffect(() => {
		connectServer('192.168.7.10', dispatch);
		return disconnectServer;
	}, []);
	
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>ControlPad</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<CPMotor id="m1" showMotorStatus="true" unidirectional="true" />
				<CPMotor id="m2" />
				<CPMotor id="m3" showMotorStatus="true" />
				<CPMotor id="m4" showMotorStatus="true" />
				<CPButton id="stopMotors" />
				<CPLight id="m1RunningLight" />
				<CPLight id="m2RunningLight" />
				<CPLight id="m3RunningLight" />
				<CPLight id="m4RunningLight" />
				<CPToggle id="toggle" labelLeft="Light Off" labelRight="Light On" />
				<CPLight id="toggleLight" />
				<CPSlider id="slider" />
				<CPTextField id="textEdit" editable="true" />
				<CPTextField id="textDisplay" />
				<CPTextField id="multiTextEdit" editable="true" multiline="true" rows="4" />
				<CPTextField id="multiTextDisplay" multiline="true" rows="4" />
			</IonContent>
		</IonPage>
	);
};
