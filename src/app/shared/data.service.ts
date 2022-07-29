import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProgress() {
    return this.http.get(`${this.apiUrl}/queue/progress/`);
  }

  getInput() {
    return this.http.get(`${this.apiUrl}/queue/input/`);
  }

}
