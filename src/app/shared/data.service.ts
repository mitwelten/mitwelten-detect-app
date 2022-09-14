import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { SpeciesDatum } from './species-datum';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = environment.apiUrl;

  progressData: BehaviorSubject<any[]>;
  detailData: BehaviorSubject<any>;
  detailDataLoading: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.progressData = new BehaviorSubject<any[]>([]);
    this.detailData = new BehaviorSubject<any>({});
    this.detailDataLoading = new BehaviorSubject<boolean>(false);
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

  getDetail(node_label: string) {
    this.detailDataLoading.next(true);
    this.http.get(`${this.apiUrl}/queue/detail/${node_label}`).subscribe((data: any) => {
      this.detailData?.next(data);
      this.detailDataLoading.next(false);
    });
  }

  getInput() {
    return this.http.get(`${this.apiUrl}/queue/input/`);
  }

  queueTasks(node_label: string | undefined) {
    return this.http.post(`${this.apiUrl}/queue/input/`, { node_label });
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

  getSpecies(confidence?: number) {
    return this.http.get<SpeciesDatum[]>(`${this.apiUrl}/species/`);
  }

  getSpeciesDetail(species?: string) {
    return this.http.get<SpeciesDatum[]>(`${this.apiUrl}/species/${species}/day/`);
  }

}
