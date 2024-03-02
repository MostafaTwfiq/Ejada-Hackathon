import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Hackathon } from '../models/hackathon.model';

@Injectable({
    providedIn: 'root'
})
export class HackathonService {
    private apiUrl = 'http://localhost:3000/hackathons'; // Replace with your API endpoint

    // Dummy data for testing
    // private dummyHackathons: Hackathon[] = [
    //     {
    //         hackathon_id: 1,
    //         name: 'Hackathon 1',
    //         theme: 'Theme 1',
    //         registration_date_range: '01/01/2022 - 02/01/2022',
    //         event_date: new Date('2022-02-15'),
    //         max_team_size: 4,
    //         max_num_teams: 10
    //     },
    //     {
    //         hackathon_id: 2,
    //         name: 'Hackathon 2',
    //         theme: 'Theme 2',
    //         registration_date_range: '03/01/2022 - 04/01/2022',
    //         event_date: new Date('2022-03-20'),
    //         max_team_size: 3,
    //         max_num_teams: 15
    //     }
    // ];

    constructor(private http: HttpClient) { }

    getHackathons(): Observable<Hackathon[]> {
        // For testing purposes, return dummy data
        // Replace with actual HTTP request when database is set up
        // return of(this.dummyHackathons);
        return this.http.get<Hackathon[]>(this.apiUrl);
    }

    getHackathonById(id: number): Observable<Hackathon> {
        // For testing purposes, find hackathon by ID from dummy data
        // Replace with actual HTTP request when database is set up
        // let hackathon = this.dummyHackathons.find(hackathon => hackathon.hackathon_id === id) ;
        // return of(hackathon != undefined? hackathon: {} );
        const url = `${this.apiUrl}/${id}/challenges`;
        return this.http.get<Hackathon>(url);
    }

    createHackathon(hackathon: Hackathon): Observable<any> {
        // return of(this.dummyHackathons.push(hackathon));
        return this.http.post(this.apiUrl, hackathon);
    }

    updateHackathon(hackathon_id?: number, hackathon?: Hackathon): Observable<any> {
        // let oldHackathon = this.dummyHackathons.find(hackathon => hackathon.hackathon_id === id);
        // oldHackathon = hackathon;
        // return of(this.dummyHackathons)
        return this.http.put(`${this.apiUrl}/${hackathon_id}`, hackathon);
    }
}