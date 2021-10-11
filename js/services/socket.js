import { Toast } from 'native-base';
import { storeObj } from '../setup';
import config from '../../config.js';
import InputGroup from '../../native-base-theme/components/InputGroup';

const io = require('socket.io-client');
let socket = null;


export const _socket = () => {
	const { dispatch, getState } = storeObj.store;
	socket = io(`${config.scoketserverSideUrl}:${config.socketport}`, {
		jsonp: false,
		transports: ['websocket'],
		// query: `token=${storeObj.store.getState().driver.user._id}`,
		// query: `token=${`$ty4r8u&hksdf7i23o4$234p567#U_zFg`}`, // static token right now
	});
	socket.on("connect", ()=>{
		console.log("socket connected ");
		// dispatch() call make user online action here
	})
	socket.on('pool-users', users=>{
		console.log(" new prefs ", users);
		dispatch({ type :'SET_PREFRENCES', payload : users })
	})
	socket.on('disconnect',()=>{
		console.log("socket disconnected ");
		// dispatch() call make user online action here
	})

}

export const emit = (key, data) => {
	console.log("socket emit ..", socket, key)
	if(socket&&key)
		socket.emit(key, data);
}
export const disconnectSocket = ()=>
	 socket && socket.removeAllListeners();
	 
