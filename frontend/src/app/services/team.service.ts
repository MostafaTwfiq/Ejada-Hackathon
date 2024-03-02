import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Hackathon } from '../models/hackathon.model';
import { Team } from '../models/team.model';
import { Competitor } from '../models/compitior.model';

@Injectable({
    providedIn: 'root'
})
export class TeamService {
    private apiUrl = 'http://localhost:3000/teams'; // Replace with your API endpoint
    private hackathonsAPI = 'http://localhost:3000/hackathon'

    constructor(private http: HttpClient) { }

    getTeams(): Observable<Hackathon[]> {
        // For testing purposes, return dummy data
        // Replace with actual HTTP request when database is set up
        // return of(this.dummyHackathons);
        return this.http.get<Hackathon[]>(this.apiUrl);
    }

    getTeamById(id: number): Observable<Hackathon> {
        // For testing purposes, find hackathon by ID from dummy data
        // Replace with actual HTTP request when database is set up
        // let hackathon = this.dummyHackathons.find(hackathon => hackathon.hackathon_id === id) ;
        // return of(hackathon != undefined? hackathon: {} );
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Hackathon>(url);
    }

    createTeam(team: Team, competitors: Competitor[]): Observable<any> {
        // return of(this.dummyHackathons.push(hackathon));
        const newTeam = {
            team_name: team.team_name,
            hackathon_id: team.hackathon_id,
            challenge_id: team.challenge_id,
            compatitors: competitors
        }
        
        const url = `${this.apiUrl}`;
        return this.http.post(url, newTeam);
    }
    getTeamsByHackathonId(hackathonId?: number): Observable<Team[]> {
        const url = `${this.apiUrl}/hackathon/${hackathonId}`;
        return this.http.get<Team[]>(url);
    }


    // updateTeam(hackathon_id?: number, hackathon?: Hackathon): Observable<any> {
    //     // let oldHackathon = this.dummyHackathons.find(hackathon => hackathon.hackathon_id === id);
    //     // oldHackathon = hackathon;
    //     // return of(this.dummyHackathons)
    //     return this.http.put(`${this.apiUrl}/${hackathon_id}`, hackathon);
    // }
}