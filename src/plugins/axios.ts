import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getLocalStorage } from "../helpers/storage";
import { KEY_CONSTANTS } from "../const/key";

export class Api {
  protected axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: window.electronAPI.env.get("ELECTRON_PUBLIC_API_BASE_URL"),
    });
  }

  public get(url: string, params: QueryParameterType = {}, headers: RequestAdditionalHeaderType = {}) {
    return this.fetch(url, "get", params, {}, headers);
  }

  public post(url: string, data: RequestBodyType = {}, headers: RequestAdditionalHeaderType = {}) {
    return this.fetch(url, "post", {}, data, headers);
  }

  public put(url: string, data: RequestBodyType = {}, headers: RequestAdditionalHeaderType = {}) {
    return this.fetch(url, "put", {}, data, headers);
  }

  public patch(url: string, data: RequestBodyType = {}, headers: RequestAdditionalHeaderType = {}) {
    return this.fetch(url, "patch", {}, data, headers);
  }

  public delete(url: string, data: RequestBodyType = {}, headers: RequestAdditionalHeaderType = {}) {
    return this.fetch(url, "delete", {}, data, headers);
  }

  public fetch(
    url: string,
    method: string,
    params: QueryParameterType,
    data: RequestBodyType,
    headers: RequestAdditionalHeaderType,
  ) {
    return this.axiosInstance.request({
      url: url,
      method: method,
      params: params,
      data: data,
      headers: headers,
    });
  }

  public default() {
    this.axiosInstance.interceptors.request.clear();

    this.axiosInstance.interceptors.response.clear();

    this.axiosInstance.interceptors.request.use(
      (configs) => this.handleDefaultRequestSuccess(configs),
      (error) => this.handleDefaultRequestError(error),
    );

    this.axiosInstance.interceptors.response.use(
      (response) => this.handleDefaultResponseSuccess(response),
      (error) => this.handleDefaultResponseError(error),
    );

    return this;
  }

  public authenticate() {
    this.axiosInstance.interceptors.request.clear();

    this.axiosInstance.interceptors.response.clear();

    this.axiosInstance.interceptors.request.use(
      (configs) => this.handleAuthenticateRequestSuccess(configs),
      (error) => this.handleDefaultRequestError(error),
    );

    this.axiosInstance.interceptors.response.use(
      (response) => this.handleDefaultResponseSuccess(response),
      (error) => this.handleDefaultResponseError(error),
    );

    return this;
  }

  protected handleDefaultRequestSuccess<C>(configs: InternalAxiosRequestConfig<C>) {
    return configs;
  }

  protected handleDefaultRequestError<C>(error: C) {
    return Promise.reject(error);
  }

  protected handleDefaultResponseSuccess(response: AxiosResponse) {
    return response;
  }

  protected handleDefaultResponseError(error: any) {
    return error.response ? error.response : Promise.reject(error);
  }

  protected handleAuthenticateRequestSuccess<C>(configs: InternalAxiosRequestConfig<C>) {
    const authAccessToken = getLocalStorage(KEY_CONSTANTS.localStorage.authAccessToken, "");
    configs.headers.Authorization = "Bearer " + authAccessToken;

    return configs;
  }
}

export const api = new Api();

export type QueryParameterType = Record<string, string | number>;

export type RequestBodyType = any;

export type RequestAdditionalHeaderType = Record<string, string | number>;
