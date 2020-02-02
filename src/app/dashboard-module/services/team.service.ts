import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Team } from '../domain-module/model/team';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  public getTeamsByDomain(id: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${environment.apiUrl}/team`, { params: { domain: id } }).pipe(catchError(super.handleError));
  }

  public getTeam(id: string): Observable<Team> {
    return this.http.get<Team>(`${environment.apiUrl}/team/${id}`, { params: { resolveMembers: 'true' } }).pipe(catchError(super.handleError));
  }

  public createTeam(domainId: string, name: string): Observable<Team> {
    let body = {
      name,
      domain: domainId
    };

    return this.http.post<Team>(`${environment.apiUrl}/team/create`, body).pipe(catchError(super.handleError));
  }

  public updateTeam(id: string, name: string, active: string): Observable<Team> {
    let body = {
      name,
      active
    };

    return this.http.patch<Team>(`${environment.apiUrl}/team/${id}`, body).pipe(catchError(super.handleError));
  }

  public addTeamMember(id: string, member: string): Observable<Team> {
    let body = {
      member
    };

    return this.http.patch<Team>(`${environment.apiUrl}/team/member/add/${id}`, body).pipe(catchError(super.handleError));
  }

  public inviteTeamMember(id: string, email: string): Observable<Team> {
    let body = {
      email
    };

    return this.http.patch<Team>(`${environment.apiUrl}/team/member/invite/${id}`, body).pipe(catchError(super.handleError));
  }

  public removeTeamMember(id: string, member: string): Observable<Team> {
    let body = {
      member
    };

    return this.http.patch<Team>(`${environment.apiUrl}/team/member/remove/${id}`, body).pipe(catchError(super.handleError));
  }

  public removeTeamRole(id: string, role: string): Observable<Team> {
    let body = {
      role
    };

    return this.http.patch<Team>(`${environment.apiUrl}/team/role/remove/${id}`, body).pipe(catchError(super.handleError));
  }

  public deleteTeam(id: string): Observable<Team> {
    return this.http.delete<Team>(`${environment.apiUrl}/team/${id}`).pipe(catchError(super.handleError));
  }

}
