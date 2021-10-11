import commonColor from "../../../../native-base-theme/variables/commonColor";
const React = require('react-native');
const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
	iosHeader: {
		backgroundColor: "#fff"
	},
	aHeader: {
		backgroundColor: "#fff",
		borderColor: "#aaa",
		elevation: 3
	},
	iosHeaderTitle: {
		fontSize: 18,
		fontWeight: "400",
		color: "#999"
	},
	aHeaderTitle: {
		fontSize: 18,
		fontWeight: "600",
		lineHeight: 26,
		marginTop: -5,
		color: commonColor.brandPrimary
	},
	cardSelect: {
		margin: 20,
		marginLeft: 20,
		padding: 10,
		marginTop: 0,
		paddingLeft: 0
	},
	payCard: {
		flexDirection: "row",
		paddingLeft: 20,
		marginTop: 0,
		paddingVertical: 10,
		backgroundColor: "#5097C5"
	},
	paytmIcon: {
		width: 35,
		height: 13,
		padding: 5,
		paddingTop: 15
	},
	experienceButton:{
    height: 50,
    alignSelf: 'center',
    width: deviceWidth - 100,
    backgroundColor: commonColor.brandButton,
    marginTop:150,
    textAlign:"center",
  },
};
