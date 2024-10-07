import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface RegistrationRequestBody {
    fullname: string;
    email: string;
    trn: string;
    shopname: string;
    telephone: string;
    whatsapp: string;
    outlet_type: number;
    amg_salesman: string;
    lat: Double;
    lng: Double;
}