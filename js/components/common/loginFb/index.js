// import { AccessToken, LoginManager } from "react-native-fbsdk";

// const getFbUrl = token =>
//   `https://graph.facebook.com/me?access_token=${token}&fields=name,first_name,last_name,email`;

// const loginWithFacebook = async () =>
//   new Promise(async (resolve) => {
//     try {
//       const result = await LoginManager.logInWithReadPermissions([
//         "public_profile",
//         "email"
//       ]);
//       if (result.isCancelled) {
//         
//       }

//       const data = await AccessToken.getCurrentAccessToken();
//       if (data.accessToken) {
//         // Fetching user-details
        
//         return resolve({ token: data.accessToken.toString(), type: "success" });
//       }

//       
//     } catch (error) {
//       
//     }
//   });

// export async function requestFbLogin(
//   socailSignupSuccess,
//   authData,
//   checkUser,
//   userLoginRequest
// ) {
//   return new Promise(async (resolve) => {
//     try {
//       const res = await loginWithFacebook();
//       const { token, type } = res;
      
//       const loginSuccessful =
//         type && token && type !== "cancel" && token.length > 0;
//       if (!loginSuccessful || type !== "success") {
//         return resolve({ successFb: false });
//       }
//       const fbUrl = getFbUrl(token);
//       const response = await fetch(fbUrl); // eslint-disable-line
//       userLoginRequest();
//       const user = await response.json();
      
//       if (!user || !user.email) {
//         return alert("Email not found");
//       }
//       const credentials = {
//         email: user.email,
//         password: user.id,
//         request: "Register"
//       };
//       socailSignupSuccess(user);
//       checkUser(credentials, user);
//     } catch (e) {
      
//     }
//   });
// }
