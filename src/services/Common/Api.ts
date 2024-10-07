// import {
//   responseTimeout,
// } from "../Constants";
// import Axios from "axios";
// import Network from "../network";
// import { Exception } from "./Exception";
// import { HttpRequest } from "./Request";
// import { ErrorResponse } from "./ErrorResponse";
// import HttpStatus from "http-status-codes";

// // const HttpStatus = require("http-status-codes");

// export default class Api {
//   static generateRequest(httpRequest: HttpRequest) {
//     console.log("Get =--->", httpRequest);

//     if (httpRequest.httpMethod === "GET") {
//       return {
//         url: httpRequest.absolutePath,
//         method: httpRequest.httpMethod,
//         headers: httpRequest.headers,

//         params: httpRequest.parameters,
//         timeout: responseTimeout,
//       };
//     } else {
//       return {
//         url: httpRequest.absolutePath,
//         method: httpRequest.httpMethod,
//         headers: httpRequest.headers,
//         params: httpRequest.parameters,
//         data: httpRequest.body,
//         timeout: responseTimeout,
//       };
//     }
//   }

//   static executeRequest (httpRequest: HttpRequest) {
//     return new Promise((resolve, reject) => {
//       Network.getInstance()
//         .fetchCurrentNetworkStatus()
//         .then((isConnected) => {
//           console.log("isConnected",isConnected);

//           if (isConnected) {
//             Axios.request(Api.generateRequest(httpRequest))
//               .then((response) => {
//                 console.log("response===>", response);

//                 resolve(response.data);
//               })
//               .catch((error) => {
//                 console.log("error", error.response);

//                 if (error.response) {
//                   if (
//                     error.response.status === 401 &&
//                     error.response.data.error === "invalid_token"
//                   ) {
//                     console.log("Error " + JSON.stringify(error));
//                     // API.getUpdatedToken(error)
//                     //   .then(result => {
//                     //     API.get(apiURL)
//                     //       .then(result => resolve(result))
//                     //       .catch(error => reject(error));
//                     //   })
//                     //   .catch(error => reject(error));
//                   } else {
//                     let failureMessage = error.response.data.error;
//                     if (failureMessage === undefined || failureMessage === "") {
//                       failureMessage = HttpStatus.getStatusText(
//                         error.response.status
//                       );
//                     }
//                     const errorResponse: ErrorResponse = {
//                       statusCode: error.response.status,
//                       error: failureMessage,
//                       data: error.response.data,
//                       exceptionType: Exception.STATUS,
//                     };
//                     reject(errorResponse);
//                   }
//                 } else {
//                   console.log("Error " + JSON.stringify(error));
//                   const errorResponse: ErrorResponse = {
//                     error: error.message,
//                     exceptionType: Exception.ERROR,
//                   };
//                   reject(errorResponse);
//                 }
//               });
//           } else {
//             const errorResponse: ErrorResponse = {
//               error: "No Internet Connection",
//               exceptionType: Exception.INTERNET,
//             };
//             reject(errorResponse);
//           }
//         });
//     });
//   }
// }





import axios from "axios";
import { baseURL } from "../Constants";
// import { base_URL } from "./baseURL";
// Default config options
const defaultOptions = {
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    // 'Content-Type': 'application/json',
    // 'mode': 'cors'
  },
};

// Create instance
let api = axios.create(defaultOptions);

api.interceptors.request.use(function (config) {
  // console.log("config", config);
  // const token = localStorage.getItem("jwt_token");
  // config.headers.jwt_token = token ? `${token}` : "";
  return config;
});
export default api;

// import {
//   responseTimeout,
// } from "../Constants";
// import Axios from "axios";
// import Network from "../network";
// import { Exception } from "./Exception";
// import { HttpRequest } from "./Request";
// import { ErrorResponse } from "./ErrorResponse";
// import HttpStatus from "http-status-codes";

// // const HttpStatus = require("http-status-codes");

// export default class Api {
//   static generateRequest(httpRequest: HttpRequest) {
//     console.log("Get =--->", httpRequest);

//     if (httpRequest.httpMethod === "GET") {
//       return {
//         url: httpRequest.absolutePath,
//         method: httpRequest.httpMethod,
//         headers: httpRequest.headers,

//         params: httpRequest.parameters,
//         timeout: responseTimeout,
//       };
//     } else {
//       return {
//         url: httpRequest.absolutePath,
//         method: httpRequest.httpMethod,
//         headers: httpRequest.headers,
//         params: httpRequest.parameters,
//         data: httpRequest.body,
//         timeout: responseTimeout,
//       };
//     }
//   }

  // static executeRequest = (httpRequest: HttpRequest) {
  //   return (
  //     Network.getInstance()
  //       .fetchCurrentNetworkStatus().then((isConnected) => {
  //         if (isConnected) {
  //           async () => {
  //             let res = await Axios.request(Api.generateRequest(httpRequest))
  //             console.log("res", res);

  //           }
  //         }
  //       }
  //       )
  //   )
  // }

//   static executeRequest = async (httpRequest: HttpRequest) => {
//     // return {
//     const res = await Axios.request(Api.generateRequest(httpRequest)).then((response) => {
//       console.log(response)
//     })
// }
// async () => {
//   await Network.getInstance()
//     .fetchCurrentNetworkStatus().then((isConnected) => {
//       console.log("isConnected",isConnected);

//       if (isConnected) {
//         Axios.request(Api.generateRequest(httpRequest)).then((response) => {
//           console.log(response)
//           resolve(response.data);
//         })
//       }
//     })
// }
// })
// return new Promise((resolve, reject) => {
//   Network.getInstance()
//     .fetchCurrentNetworkStatus()
//     .then((isConnected) => {
//       console.log("isConnected", isConnected);
//       if (isConnected) {

//       }
//       if (isConnected) {
//         Axios.request(Api.generateRequest(httpRequest))
//           .then((response) => {
//             console.log("response===>", response);

//             resolve(response.data);
//           })
//           .catch((error) => {
//             console.log("error", error.response);

//             if (error.response) {
//               if (
//                 error.response.status === 401 &&
//                 error.response.data.error === "invalid_token"
//               ) {
//                 console.log("Error " + JSON.stringify(error));
//               } else {
//                 let failureMessage = error.response.data.error;
//                 if (failureMessage === undefined || failureMessage === "") {
//                   failureMessage = HttpStatus.getStatusText(
//                     error.response.status
//                   );
//                 }
//                 const errorResponse: ErrorResponse = {
//                   statusCode: error.response.status,
//                   error: failureMessage,
//                   data: error.response.data,
//                   exceptionType: Exception.STATUS,
//                 };
//                 reject(errorResponse);
//               }
//             } else {
//               console.log("Error " + JSON.stringify(error));
//               const errorResponse: ErrorResponse = {
//                 error: error.message,
//                 exceptionType: Exception.ERROR,
//               };
//               reject(errorResponse);
//             }
//           });
//       } else {
//         const errorResponse: ErrorResponse = {
//           error: "No Internet Connection",
//           exceptionType: Exception.INTERNET,
//         };
//         reject(errorResponse);
//       }
//     });
// });
//   }
// }




// import axios from "axios";
// import { baseURL } from "../Constants";
// import { defaultHeaders } from "./Request";
// // import { base_URL } from "./baseURL";
// // Default config options
// const defaultOptions = {
//   baseURL: baseURL,
//   headers: defaultHeaders
//   // 'Content-Type': 'multipart/form-data',
//   // 'Content-Type': 'application/json',
//   // 'mode': 'cors'
//   // },
// };

// // Create instance
// let api = axios.create(defaultOptions);

// api.interceptors.request.use(function (config) {
//   // console.log("config", config);
//   // const token = localStorage.getItem("jwt_token");
//   // config.headers.jwt_token = token ? `${token}` : "";
//   return config;
// });
// export default api;