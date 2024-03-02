import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model'; // Adjust the path as needed

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private baseUrl = 'http://your-backend-api.com/api'; // Adjust this URL to your backend API

    constructor(private http: HttpClient) { }

    login(username?: string, password?: string): Observable<any> {
        const url = `${this.baseUrl}/login`;
        return this.http.post(url, { username, password }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(
            map((response: any) => {
                // Assuming the response contains the token
                if (response && response.token) {
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: response.token }));
                }
                return response;
            }),
            catchError(error => throwError(error))
        );
    }

    signup(user: User): Observable<any> {
        const url = `${this.baseUrl}/signup`;
        return this.http.post(url, user, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    logout(): void {
        // Remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getToken(): string | null {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        return currentUser.token || null;
    }
}