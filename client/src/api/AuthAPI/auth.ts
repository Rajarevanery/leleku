import axios from "axios";
import { BASE_URL } from "../Endpoint";
import type { ILogin, IRegister } from "../../types/types";

export async function loginUser(data: ILogin) {
  const { email, password } = data;

  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.error("Err: ", error);
    throw new Error("Error");
  }
}

export async function registerUser(data: IRegister) {
  const { email, password, confirm_password, username, full_name, role } = data;

  try {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, {
      email,
      password,
      confirm_password,
      username,
      full_name,
      role
    });

    return response;
  } catch (error) {
    console.error("Err: ", error);
    throw new Error("Error");
  }
}

export async function getUser() {
  try {
    const response = await axios.get(`${BASE_URL}/api/auth/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Err: ", error);
    throw Error("Error");
  }
}

export async function logoutUser() {
  try {
    return await axios.post(
      `${BASE_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Err: ", error);
    throw error;
  }
}
