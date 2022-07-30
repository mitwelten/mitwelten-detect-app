import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = environment.apiUrl;

  progressData: BehaviorSubject<any[]>;

  constructor(private http: HttpClient) {
    this.progressData = new BehaviorSubject<any[]>([]);
  }

  login(): Observable<boolean> {
    return this.http.get<{authenticated: boolean}>(`${this.apiUrl}/login`).pipe(
      map(response => response.authenticated)
    );
  }

  getProgress() {
    this.http.get(`${this.apiUrl}/queue/progress/`).subscribe((data: any) => {
      this.progressData?.next(data);
    });
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
