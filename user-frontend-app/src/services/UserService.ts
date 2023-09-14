import axios from "axios";
import { IUser } from "../models/IUser";

const USER_API_BASE_URL = `http://localhost:8082/api/users`;

export class UserService {
  public static getAllUsers() {
    return axios.get(USER_API_BASE_URL);
  }

  public static registerUser(user: IUser) {
    return axios.post(USER_API_BASE_URL, user);
  }

  public static getUserById(userId: string) {
    return axios.get(`${USER_API_BASE_URL}/${userId}`);
  }

  public static updateUser(userId: any, user: IUser) {
    return axios.put(`${USER_API_BASE_URL}/${userId}`, user);
  }

  public static removeUser(userId: any) {
    return axios.delete(`${USER_API_BASE_URL}/${userId}`);
  }
}
