import { Challenge } from "./challenge.model";

export interface Hackathon {
    hackathon_id?: number;
    name?: string;
    theme?: string;
    registration_start_date?: Date;
    registration_end_date?: Date;
    event_date?: Date;
    max_team_size?: number;
    max_num_teams?: number;
    challenges?: Challenge[];
}