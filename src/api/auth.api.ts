import { AxiosResponse } from "axios";
import instance from "../utils/axios";
import { LoginDto, RegisterDto, AuthResponse, User, ApiResponse } from "../types";

export const registerOwner = (
    data: RegisterDto
): Promise<AxiosResponse<ApiResponse<AuthResponse>>> =>
    instance.post("/users/register", data);

export const loginOwner = (
    data: LoginDto
): Promise<AxiosResponse<ApiResponse<AuthResponse>>> =>
    instance.post("/users/login", data);

export const logoutOwner = (): Promise<AxiosResponse<ApiResponse<void>>> =>
    instance.post("/users/logout");

export const getMe = (): Promise<AxiosResponse<ApiResponse<User>>> => {
    return instance.get("/users/me");
};
