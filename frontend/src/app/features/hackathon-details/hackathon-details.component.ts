import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { HackathonService } from 'src/app/services/hackathon.service';
import { Hackathon } from 'src/app/models/hackathon.model';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { RoleEnum } from 'src/enums/role.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Challenge } from 'src/app/models/challenge.model';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';
import { Observable, forkJoin } from 'rxjs';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-hackathon-details',
  templateUrl: './hackathon-details.component.html',
  styleUrls: ['./hackathon-details.component.css']
})
export class HackathonDetailsComponent  extends BaseComponent implements OnInit  {
  hackathon: Hackathon = {} as Hackathon; // Initialize with an empty object
  isAddMode: boolean = false;
  isEditMode: boolean = false; // Starts in view mode by default
  isViewMode: boolean = true;
  challenges: Challenge[] = [];
  currentUser?: User | null;
  RoleEnum = RoleEnum;
  newChallenges: string = "";
  teams: Team[] = [];
  maxSize: number = 0;

  constructor(
    injector: Injector,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private hackathonService: HackathonService,
    private authService: AuthenticationService,
  ) {
    super(injector);

  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    console.log(this.currentUser?.role)

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id == undefined) {
        this.isViewMode = false;
        this.isAddMode = true;
      } else if (id) {
        this.loadHackathonDetails(+id);
        this.teamService.getTeamsByHackathonId(+id).subscribe(
          (response: any) => {
            this.teams = response;
            console.log(response)
            console.log(this.teams)
          },
          (error) => {
            console.error('Failed to get teams:', error);
          }
        );
      }
    });


  }


  loadHackathonDetails(id: number): void {
    // const combinedRqsObservable: Observable<any> = forkJoin<any>([
    //   this.hackathonService.getHackathonById(id),
    //   this.teamService.getTeamsByHackathonId(id)
    // ]);
    // combinedRqsObservable.subscribe(([data, teams, regions]) => {
    //   this.hackathon = data.hackathon_details;
    //   this.challenges = data.challenges;
    //   this.maxSize = this.hackathon.max_team_size == null ? 0 : this.hackathon.max_team_size;
    //   this.isEditMode = false; // Ensure we're in view mode after loading details

    //   this.teams = teams;
    //   console.log(teams)

    // });

    this.hackathonService.getHackathonById(id).subscribe({
      next: (data: any) => {
        this.hackathon = data.hackathon_details;
        this.challenges = data.challenges;
        this.maxSize = this.hackathon.max_team_size == null ? 0 : this.hackathon.max_team_size;
        this.isEditMode = false; // Ensure we're in view mode after loading details
      },
      error: (error: HttpErrorResponse) => {
        this.translate.get('hackathon.error', { error: error.message }).subscribe((message: string) => alert(message));
        this.router.navigate(['/hackathons']); // Redirect on error
      }
    });
  }

  enableEditMode(): void {
    this.isEditMode = true;
    this.isViewMode = false;
    this.isAddMode = false; // Ensure it's not treated as add mode
  }

  saveHackathon(): void {
    if (this.isAddMode) {
      this.hackathon.challenges = this.challenges
      this.hackathonService.createHackathon(this.hackathon).subscribe({
        next: () => {
          this.translate.get('hackathonDetails.add.success').subscribe((message: string) => alert(message));
          this.router.navigate(['/hackathons'])
        },
        error: (error: HttpErrorResponse) => this.translate.get('hackathonDetails.add.failure', { error: error.message }).subscribe((message: string) => alert(message))
      });
    } else {
      this.hackathonService.updateHackathon(this.hackathon.hackathon_id, this.hackathon).subscribe({
        next: () => {
          this.translate.get('hackathonDetails.edit.success').subscribe((message: string) => alert(message));
          this.router.navigate(['/hackathons']);
        },
        error: (error: HttpErrorResponse) => this.translate.get('hackathonDetails.edit.failure', { error: error.message }).subscribe((message: string) => alert(message))
      });
    }
  }

  cancel(): void {
    // Navigate back to the list or to the view mode based on the current mode
    if (this.isAddMode || this.isEditMode) {
      this.router.navigate(['/hackathons']);
    } else {
      this.isEditMode = false;
    }
  }

  addChallenges() {
    if (this.newChallenges.trim() !== '') {
      const challengeArray = this.newChallenges.split(',').map(challenge => ({
        title: challenge.trim()
      }));
      this.challenges.push(...challengeArray);
      this.newChallenges = ''; // Clear the input field after adding the challenges
    }
  }

  register() {
    this.router.navigate(['/teams/add/', this.hackathon.hackathon_id]);
  }

  viewCompetitors(teamId: number) {
    this.router.navigate(['/team-details', teamId]); // Replace '/competitors' with the actual route path for the competitors component
  }
}