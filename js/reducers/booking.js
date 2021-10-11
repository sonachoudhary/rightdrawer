import { REHYDRATE } from 'redux-persist//lib/constants';
import { BARBER_BOOKING_DATE, BARBER_BOOKING_DATE_SLOT, BARBER_BOOKING_TIME, BARBER_BOOKING_TIME_SLOT, BARBER_BOOKING_BARBER_ID, BARBER_BOOKING_BARBER_NAME, BARBER_BOOKING_SERVICE_PRICE, BARBER_BOOKING_SERVICE_ID, BARBER_BOOKING_SERVICE_NAME, BARBER_BOOKING_TIMESLOT, BARBER_LIST, BARBER_SERVICE, SET_UPCOMING_APPOINTMENT_LIST, BARBER_MONTH_EARNING, SET_NOTIFICATION_LIST, ACCEPTED_CUSTOMER_NAME, BARBER_BOOKING_PAYMENT_METHOD, BARBER_SPECIFIC_SERVICE, TIME_SLOTS, SET_BARBER_POSITION, EDIT_SERVICE_DATA, SET_TRACK_APPOINTMENT, APPONMENT_LIST } from '../actions/common/booking';
import { SET_APPOINTMENT_LIST, UPDATE_CUSTOMER_TRACKING_COORDS, UPDATE_BARBER_TRACKING_COORDS, SET_CANCLE_APPOINTMENT, SET_SERVED_APPOINTMENT } from '../actions/common/signin';

const initialState = {
	_id: undefined,
	bookingDateSlots: undefined,	
	bookingDate: undefined,
	bookingSlot: [],
	barberList:[],
	barberService: [],
	bookingTime: undefined,
	bookingTimeSlot:undefined,
	bookingBarberId: undefined,
	bookingServiceId: undefined,
	bookingServiceName: undefined,
	bookingBarberName: undefined,
	bookingBarberPrice: undefined,
	appointmentList: [],
	upcomingAppointmentList:[],
	barberMonthEarning:[],
	notificationList:[],
	acceptedCustomerName: undefined,
	bookingBarberPayMethod: undefined,
	barberSpecificService:[],
	barberPosition:[],
	customerPositionLat:undefined,
	customerPositionLng:undefined,
	slots:[],
	editServiceData:[],
	trackAppointment: undefined,
	cancleAppointment: undefined,
	servedAppointment: undefined,
	barberAppointmentSlots: []
};


const booking = (state = initialState, action) => {
	switch (action.type) {
		case BARBER_BOOKING_DATE:
			return {
				...state,
				bookingDate: action.payload
			};

		case BARBER_BOOKING_DATE_SLOT:
			return {
				...state,
				bookingDateSlots: action.payload
			};
		case BARBER_BOOKING_TIME:
			return {
				...state,
				bookingTime: action.payload
			};
		case BARBER_BOOKING_TIME_SLOT:
			return {
				...state,
				bookingTimeSlot: action.payload
			};
		case BARBER_BOOKING_BARBER_ID:
			return {
				...state,
				bookingBarberId:action.payload
			};
		case BARBER_BOOKING_BARBER_NAME:
			return {
				...state,
				bookingBarberName:action.payload
			};
		case BARBER_BOOKING_SERVICE_PRICE:
			return {
				...state,
				bookingBarberPrice:action.payload
			};
		case BARBER_BOOKING_SERVICE_ID:
			return {
				...state,
				bookingServiceId:action.payload
			};
		case BARBER_BOOKING_SERVICE_NAME:
			return {
				...state,
				bookingServiceName:action.payload
			};
		case BARBER_BOOKING_TIMESLOT:
			return {
				...state,
				bookingSlot: action.payload	
			}
		case BARBER_LIST:
			return {
				...state,
				barberList: action.payload		
			}
		case BARBER_SERVICE:
			return {
				...state,
				barberService: action.payload		
			}
		case SET_APPOINTMENT_LIST:
			return {
				...state,
				appointmentList: action.payload		
			}

		case SET_SERVED_APPOINTMENT:
			return {
				...state,
				servedAppointment: action.payload		
			}

		case SET_CANCLE_APPOINTMENT:
			return {
				...state,
				cancleAppointment: action.payload		
			}

		case SET_UPCOMING_APPOINTMENT_LIST:
			return {
				...state,
				upcomingAppointmentList: action.payload		
			}
		case BARBER_MONTH_EARNING:
			return {
				...state,
				barberMonthEarning: action.payload		
			}
		case SET_NOTIFICATION_LIST:
			return {
				...state,
				notificationList: action.payload		
			}
		case ACCEPTED_CUSTOMER_NAME:
			return {
				...state,
				acceptedCustomerName: action.payload		
			}
		case BARBER_BOOKING_PAYMENT_METHOD:
			return {
				...state,
				bookingBarberPayMethod: action.payload		
			}
		case BARBER_SPECIFIC_SERVICE:
			return{
				...state,
				barberSpecificService: action.payload			
			}
		case TIME_SLOTS:
			return{
				...state,
				slots: action.payload			
			}	
		case SET_BARBER_POSITION: 
			return{
				...state,
				barberPosition: action.payload			
			}

		case SET_TRACK_APPOINTMENT: 
			return{
				...state,
				trackAppointment: action.payload			
			}
		case UPDATE_BARBER_TRACKING_COORDS:
			return{
				...state,
				barberPosition:action.payload.barber,
			}
		case UPDATE_CUSTOMER_TRACKING_COORDS:
			return{
				...state,
				customerPositionLat:action.payload.customer.Lat,
				customerPositionLng:action.payload.customer.Lng,
			}
		case EDIT_SERVICE_DATA:		
			
			return{
				...state,
				editServiceData: action.payload			
			}
		case APPONMENT_LIST: 
			return{
				...state,
				barberAppointmentSlots: action.payload			
			}
		default:
			return state;
	}
};
export default booking;
