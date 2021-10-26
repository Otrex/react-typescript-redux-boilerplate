export interface RequestOptions {
  method: RequestMethod;
  url: string;
  data?: ObjectANY;
  params?: ObjectANY;
  contentType?: string;
}

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export type ObjectANY = { [key: string]: any };
