import { RequestMethod } from "@app/types";
import Api from "../core/Api";
import { LoginParams, RegistrationParams } from "./types";

export class AuthApi extends Api {
  login = async (data: LoginParams) => {
    return this.__request({
      method: RequestMethod.POST,
      url: "/account/api/login",
      data,
    });
  };

  logout = async () => {
    return this.__request({
      method: RequestMethod.GET,
      url: "/account/api/logout",
    });
  };

  register = async (data: RegistrationParams) =>
    this.__request({
      method: RequestMethod.POST,
      url: "/account/api/register",
      data,
    });
}
