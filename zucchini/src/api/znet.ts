import { createData, getData, isValid, removeData } from "./zdata";
import { AuthResponse, AuthRequest, ReAuthRequest } from "./zmodels";
import axios from "axios";

export async function authenticate(username: string, password: string) {
  const request: AuthRequest = {
    username: username,
    password: password,
    client_id: "sdf",
    grant_type: "password",
  };
  const sendData = new URLSearchParams();

  for (const key in request) {
    sendData.append(key, (request as any)[key]);
  }

  const req = axios({
    method: "POST",
    url: "https://api.sdf.cloud/test/connect/token",
    data: sendData,
  });

  const dataPromise = req.then((response) => response.data);

  dataPromise.then((data) => {
    const loginData: AuthResponse = JSON.parse(JSON.stringify(data));

    createData("authToken", loginData.access_token, 30);
    createData("reAuthToken", loginData.refresh_token, 60);
  });
}

export async function refreshAuth() {
  const refresh = getData("reAuthToken").value;
  if (isValid(refresh)) {
    const request: ReAuthRequest = {
      refresh_token: refresh,
      grant_type: "refresh_token",
      client_id: "sdf",
    };
    console.log("refresh token" , refresh);

    const sendData = new URLSearchParams();

    for (const key in request) {
      sendData.append(key, request[key]);
    }

    const req = axios({
      method: "POST",
      url: "https://api.sdf.cloud/test/connect/token",
      data: sendData,
    });

    return await req;
  } else {
    return Promise.reject();
  }
}

export async function sendFormData(url: string, data: any, method: any) {
  let authToken = getData("authToken").value;
  if (authToken == "" || authToken == null) {
    await refreshAuth();
    authToken = getData("authToken").value;
  }

  const sendData = new URLSearchParams();

  for (const key in data) {
    sendData.append(key, data[key]);
  }

  const req = axios({
    method: method,
    url: url,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: sendData,
  });

  return (await req).data;
}

export async function sendData(url: string, data: any, method: any) {
  let authToken = getData("authToken").value;
  if (authToken == "" || authToken == null) {
    await refreshAuth();
    authToken = getData("authToken").value;
  }

  const req = axios({
    method: method,
    url: url,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: JSON.parse(data),
  });

  return (await req).data;
}

