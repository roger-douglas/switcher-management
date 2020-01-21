import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Domain } from 'src/app/dashboard-module/domain-module/model/domain';
import { Observable } from 'rxjs';
import { Group } from '../domain-module/model/group';
import { Config } from '../domain-module/model/config';
import { catchError } from 'rxjs/operators';
import { Strategy } from '../domain-module/model/strategy';
import { Team } from '../domain-module/model/team';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DomainService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  public getDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>(`${environment.apiUrl}/domain`).pipe(catchError(super.handleError));
  }

  public getDomain(id: string): Observable<Domain> {
    return this.http.get<Domain>(`${environment.apiUrl}/domain/` + id).pipe(catchError(super.handleError));
  }

  public setDomainEnvironmentStatus(id: string, env: string, status: boolean): Observable<Domain> {
    const body = {
      [`${env}`]: status
    }
    return this.http.patch<Domain>((`${environment.apiUrl}/domain/updateStatus/` + id), body).pipe(catchError(super.handleError));
  }

  public updateDomain(id: string, description: string): Observable<Domain> {
    const body = {
      description
    }
    return this.http.patch<Domain>((`${environment.apiUrl}/domain/` + id), body).pipe(catchError(super.handleError));
  }

}