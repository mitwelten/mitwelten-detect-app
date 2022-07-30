import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(): Observable<boolean> {
    return this.http.get<{authenticated: boolean}>(`${this.apiUrl}/login`).pipe(
      map(response => response.authenticated)
    );
  }

  getProgress() {
    return this.http.get(`${this.apiUrl}/queue/progress/`);
  }

  getInput() {
    return this.http.get(`${this.apiUrl}/queue/input/`);
  }

  queueTasks(node_label: string | undefined, state: number | null | undefined) {
    return this.http.post(`${this.apiUrl}/queue/input/`, { node_label, state });
  }

  resetFailedTasks(node_label: string | undefined) {
    return this.http.patch(`${this.apiUrl}/queue/input/`, { node_label, 'action': 'reset_failed' });
  }

  pauseTasks(node_label: string | undefined) {
    return this.http.patch(`${this.apiUrl}/queue/input/`, { node_label, 'action': 'pause' });
  }

  resumeTasks(node_label: string | undefined) {
    return this.http.patch(`${this.apiUrl}/queue/input/`, { node_label, 'action': 'resume' });
  }

}
