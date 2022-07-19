import { Client } from '@stomp/stompjs';

var stompClient = null;

// Activate a STOMP network connection to the ControlPad server.
export function connectServer(serverNetworkDomain, dispatch) {
	try {
		
		// Create the STOMP network client
		const serverUrl = 'ws://' + serverNetworkDomain + ':8080/controlPadServer/websocket';
		stompClient = new Client({
			brokerURL: serverUrl,
			debug: function (str) {
				console.log(str);
			},
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
		});
		
		// Establish a callback function that dispatches state update messages sent by the server.
		// An example message received from the server is:
		//   { @class:"org.smn.controlpad.model.state.MotorState", id: "m1", speed: 20, forward: true }
		// An example of the command generated from the message is:
		//   { id: "m1", fields: { "@class":"org.smn.controlpad.model.control.CPMotor", id: "m1", speed: 20, forward: true }, updateServer: false }
		stompClient.onConnect = function (frame) {
			console.log('ControlPad connected: ' + frame);
			stompClient.subscribe('/client/doMessage', function (message) {
				console.log("Dispatching message from server: " + message.body);	

				const control = JSON.parse(message.body).control;
				const command = { id: control.id, fields: { ...control }, updateServer: false };
				dispatch(command);
			});
		};
		
		// Establish a callback function that logs STOMP errors
		stompClient.onStompError = function (frame) {
			// Will be invoked in case of error encountered by Broker
			// Bad login/passcode typically will cause an error
			// Compliant brokers will set `message` header with a brief message. Body may contain details.
			// Compliant brokers will terminate the connection after any error
			console.log('Broker reported error: ' + frame.headers['message']);
			console.log('Additional details: ' + frame.body);
		};
		
		// Enable the STOMP client
		stompClient.activate();

	} catch (error) {
		console.log(error);
	}
}

// Dispatch a state update message to the server.  An example message is:
//   { controlState: { @class: "org.smn.controlpad.model.state.MotorState", id: "m1", speed:20, forward: true } }
//
export function doServerDispatch(message) {
    const data = JSON.stringify(message);
	console.log("Sending message to server: " + data);
	try {
		stompClient.publish({ destination: '/server/doMessage', body: data });
	} catch (e) {
		console.log ("Network error: " + e);
	}
}

// Deactivate the STOMP network connection.
export function disconnectServer() {
    if (stompClient !== null) {
		stompClient.deactivate();
	}
	console.log("ControlPad disconnected");
}
