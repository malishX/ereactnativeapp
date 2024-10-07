import { BaseResponse } from "../../../services";

export interface AddProfileResponse extends BaseResponse {
    success: number;
    specification: string;
    data: ProfileData[]
}

export interface ProfileData {

}