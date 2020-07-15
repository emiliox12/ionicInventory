import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  // withCredentials: true
};

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {

  // tslint:disable-next-line: variable-name
  constructor(private _httpClient: HttpClient) {}

  async callApiPost(serviceURL, requestData) {
    const serviceRequestPromise = this._httpClient
      .post(serviceURL, JSON.stringify(requestData), httpOptions)
      .toPromise();
    const rawSrvResp: any = await serviceRequestPromise;
    return rawSrvResp;
  }
  async callApiPut(serviceURL, requestData) {
    const serviceRequestPromise = this._httpClient
      .put(serviceURL, JSON.stringify(requestData), httpOptions)
      .toPromise();
    const rawSrvResp: any = await serviceRequestPromise;
    return rawSrvResp;
  }

  async callApiGet(serviceURL) {
    const serviceRequestPromise = this._httpClient
      .get(serviceURL)
      .toPromise();
    const rawSrvResp: any = await serviceRequestPromise;
    return rawSrvResp;
  }

  async callApiDelete(serviceURL) {
    const serviceRequestPromise = this._httpClient
      .delete(serviceURL)
      .toPromise();
  }

}
