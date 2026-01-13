import { AxiosResponse } from "axios";
import instance from "../utils/axios";
import { LoginDto, RegisterDto, AuthResponse, User, ApiResponse } from "../types";

export const registerStaff = (
    data: RegisterDto
): Promise<AxiosResponse<ApiResponse<AuthResponse>>> =>
    instance.post("/auth/register", data);

export const loginStaff = (
    data: LoginDto
): Promise<AxiosResponse<ApiResponse<AuthResponse>>> =>
    instance.post("/auth/login", data);

export const logoutStaff = (): Promise<AxiosResponse<ApiResponse<void>>> =>
    instance.post("/users/logout");

export const getMyProfile = (): Promise<AxiosResponse<ApiResponse<User>>> => {
    return instance.get("/users/me");
};
