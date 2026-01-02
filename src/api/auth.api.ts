import instance from "../utils/axios";

export const registerOwner = (data: any) => instance.post("/users/register", data);

export const loginOwner = (data: any) => instance.post("/users/login", data);

export const logoutOwner = () => instance.post("/users/logout");

export const getMe = () => {
    instance.get("/users/me");
}
