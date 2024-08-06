import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpHelperService {
  constructor(private httpClient: HttpClient) {}

  httpGet =  (reqUrl: string) =>
    this.httpClient.get(`${baseUrl}/${reqUrl}`);

  
  httpPost =  (reqUrl: string, reqBody: any) =>
    this.httpClient.post(`${baseUrl}/${reqUrl}`, reqBody);
}
export const baseUrl = "http://localhost:5112";