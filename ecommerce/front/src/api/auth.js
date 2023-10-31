import axios from "axios";

const { REACT_APP_API_URL: api_url } = process.env;

export async function register(username, password, email) {
  try {
    const response = await axios.post(
      `${api_url}/auth/register`,
      {
        username,
        password,
        email,
      },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    return error.response;
  }
}

export async function login(username, password) {
  try {
    const response = await axios.post(
      `${api_url}/auth/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    return error.response;
  }
}
