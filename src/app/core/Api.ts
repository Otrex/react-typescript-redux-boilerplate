import config from "@app/config";
import axios from "axios";
import { RequestMethod, RequestOptions } from "../types";

// axios.defaults.baseURL = process.env.REACT_APP_BE_URL;
const instance = axios.create();

export default class API {
  baseURI: string = config.baseURL!;

  token!: string;

  // constructor (config: { baseURI: string }) {
  //   const { baseURI } = config;
  //   this.baseURI = baseURI
  // }

  __jsonRequest(requestOptions: RequestOptions) {
    const { data, params, contentType, url, method } = requestOptions;

    if (!params) requestOptions.params = {};
    if (!data) requestOptions.data = {};

    return instance.request({
      url,
      method,
      data,
      params: {
        ...params,
      },
      headers: {
        "Content-Type":
          contentType !== undefined ? contentType : "application/json",
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      },
    });
  }

  async __request(requestOptions: RequestOptions) {
    const { method, data, params, contentType } = requestOptions;
    let { url } = requestOptions;
    let query = "";

    if (method === RequestMethod.GET) {
      query = Object.entries(data as Record<string, any>)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      query = `?${query}`;
    }

    try {
      url = url.includes("http") ? url : `${this.baseURI}${url}${query}`;
      const res: any = await this.__jsonRequest({
        method,
        url,
        data,
        params,
        contentType,
      });

      if (res.data.status === "success") {
        return res.data;
      }
      return Promise.reject(res.data);
    } catch (e: any) {
      if (e.response) {
        if (e.response.status === 401) {
          window.document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.document.cookie =
            "account=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.document.cookie =
            "kyc=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          if (!window.location.toString().includes("login")) {
            window.location.href = "/";
          }
        }
        return Promise.reject(e.response.data);
      }
      return Promise.reject(e);
    }
  }

  setToken(token: string) {
    this.token = token;
  }
}
