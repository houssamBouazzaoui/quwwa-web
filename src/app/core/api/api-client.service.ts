import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG, ApiConfig } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_CONFIG) private readonly config: ApiConfig,
  ) {}

  healthDb(): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.config.baseUrl}/health/db`);
  }

  version() {
    return this.http.get<{
      name: string;
      env: string;
      version: string | null;
      commit: string | null;
      builtAt: string | null;
    }>(`${this.config.baseUrl}/meta/version`);
  }
}
