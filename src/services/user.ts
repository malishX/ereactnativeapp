/* eslint-disable prefer-const */
import Api from "./Common/Api";
import { MyGroupRequest } from "./requests/myGroupRequest";

export class UserApi {
  public getMyGroups(): Promise<any> {
    let request = new MyGroupRequest();
    return new Promise<any>((resolve, reject) => {
      Api.executeRequest(request)
        .then((result) => resolve(result as any))
        .catch((error) => reject(error));
    });
  }
  // public constructor() {}
  // public login(data: LoginRequestBody): Promise<LoginResponse> {
  //   let request = new LoginRequest(data);
  //   return new Promise<LoginResponse>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as LoginResponse))
  //       .catch(error => reject(error));
  //   });
  // }
  // public register(data: RegisterRequestBody): Promise<RegisterResponse> {
  //   let request = new RegisterRequest(data);
  //   return new Promise<RegisterResponse>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as RegisterResponse))
  //       .catch(error => reject(error));
  //   });
  // }
  // public verify(data: VerifyRequestBody): Promise<RegisterResponse> {
  //   let request = new VerifyRequest(data);
  //   return new Promise<RegisterResponse>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as RegisterResponse))
  //       .catch(error => reject(error));
  //   });
  // }
  // public getCountries(): Promise<GetLocationResponse> {
  //   let request = new GetLocationRequest();
  //   return new Promise<GetLocationResponse>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as GetLocationResponse))
  //       .catch(error => reject(error));
  //   });
  // }
  // GROUPS API ------------>
  // public getGroupInfo(endPoint: string): Promise<GetGroupInfoResponse> {
  //   let request = new GetGroupInfoRequest(endPoint);
  //   return new Promise<GetGroupInfoResponse>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as GetGroupInfoResponse))
  //       .catch(error => reject(error));
  //   });
  // }
  // public getUserGroup(): Promise<Array<GetGroupsResponse>> {
  //   let request = new GetUserGroupRequest();
  //   return new Promise<Array<GetGroupsResponse>>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as Array<GetGroupsResponse>))
  //       .catch(error => reject(error));
  //   });
  // }
  // public getGroupCategories(): Promise<GroupsCategoriesResponse> {
  //   let request = new GetGroupInfoRequest("");
  //   return new Promise<GroupsCategoriesResponse>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as GroupsCategoriesResponse))
  //       .catch(error => reject(error));
  //   });
  // }
  // public getMyGroups(): Promise<any> {
  //   let request = new MyGroupRequest();
  //   // request.headers.Authorization = `Bearer ${token}`;
  //   return new Promise<any>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as any))
  //       .catch(error => reject(error));
  //   });
  // }
  // public createGroup(createGroupRequestBody: CreateGroupRequestBody): Promise<CreateGroupResponse> {
  //   let request = new CreateGroupRequest(createGroupRequestBody);
  //   return new Promise<CreateGroupResponse>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as CreateGroupResponse))
  //       .catch(error => reject(error));
  //   });
  // }
  // public joinGroup(endPoint: string): Promise<JoinGroupResponse> {
  //   let request = new JoinGroupRequest(endPoint);
  //   return new Promise<JoinGroupResponse>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as JoinGroupResponse))
  //       .catch(error => reject(error));
  //   });
  // }
  // public leaveGroup(endPoint: string): Promise<LeaveGroupResponse> {
  //   let request = new LeaveGroupRequest(endPoint);
  //   return new Promise<LeaveGroupResponse>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as LeaveGroupResponse))
  //       .catch(error => reject(error));
  //   });
  // }
  // public acceptMemberInGroup(groupID: string, userID: string): Promise<CreateGroupResponse> {
  //   let request = new AcceptMemberGroupRequest(groupID, userID);
  //   // request.headers.Authorization = `Bearer ${token}`;
  //   return new Promise<LeaveGroupResponse>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as LeaveGroupResponse))
  //       .catch(error => reject(error));
  //   });
  // }
  // public rejectMemberInGroup(groupID: string, userID: string, token: string): Promise<LeaveGroupResponse> {
  //   let request = new RejectMemberGroupRequest(groupID, userID);
  //   // request.headers.Authorization = `Bearer ${token}`;
  //   return new Promise<LeaveGroupResponse>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as LeaveGroupResponse))
  //       .catch(error => reject(error));
  //   });
  // }
  // public sendGroupReport(sendGroupReportRequestBody: SendGroupReportRequestBody): Promise<CreateGroupResponse> {
  //   let request = new SendGroupReportRequest(sendGroupReportRequestBody);
  //   // request.headers.Authorization = `Bearer ${token}`;
  //   return new Promise<ReportGroupResponse>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as ReportGroupResponse))
  //       .catch(error => reject(error));
  //   });
  // }
  // public getGroupReport(token: string, sendGroupReportRequestBody :): Promise<CreateGroupResponse> {
  //   let request = new SendGroupReportRequest(token, sendGroupReportRequestBody);
  //   request.headers.Authorization = `Bearer ${token}`;
  //   return new Promise<ReportGroupResponse>((resolve, reject) => {
  //     Api.executeRequest(request)
  //       .then(result => resolve(result as ReportGroupResponse))
  //       .catch(error => reject(error));
  //   });
  // }
}

export const userApi = new UserApi();
