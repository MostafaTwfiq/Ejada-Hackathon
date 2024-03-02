import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model'; // Adjust the path as needed

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;
    private baseUrl = 'http://localhost:3000/users'; // Adjust this URL to your backend API

    constructor(private http: HttpClient) {
        // Initialize currentUserSubject with the user from local storage, if available
        this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/login`, { username, password })
            .pipe(map(user => {
                // Store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                console.log(user)
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout(): void {
        // Remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    // Example helper method to check if the current user has the 'Admin' role
    isAdmin(): boolean {
        const currentUser = this.currentUserValue;
        return !!currentUser && currentUser.role === 'Admin';
    }

    public getToken(): string | null {
        const currentUser = localStorage.getItem('currentUser');
        return currentUser ? JSON.parse(currentUser).token : null;
    }

    signup(user: User): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/register`, user);
    }
}