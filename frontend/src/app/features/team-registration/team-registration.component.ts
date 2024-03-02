import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Competitor } from 'src/app/models/compitior.model';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-registration',
  templateUrl: './team-registration.component.html',
  styleUrls: ['./team-registration.component.css']
})
export class TeamRegistrationComponent implements OnInit {
  teamName: string = '';
  selectedHackathon: number = -1;
  teamMembers: Competitor[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private teamService: TeamService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.selectedHackathon = parseInt(params.get('hackathon_id') || '-1');
    });
  }

  // Implement methods for adding/removing team members, submitting form
  // You can add these methods to handle member addition/removal and form submission
  addMember() {
    this.teamMembers.push({ name: '', email: '', mobile: '', title: '' });
  }

  removeMember(index: number) {
    if (this.teamMembers.length > 1) {
      this.teamMembers.splice(index, 1);
    }
  }

// Implement method for submitting the team registration form
  submitTeamRegistrationForm() {
      // Create a new team object with teamName, selectedHackathon, and teamMembers
      const newTeam: Team = {
        team_name: this.teamName,
        hackathon_id: this.selectedHackathon
      };
      
      // Call the team service method to register the new team
      this.teamService.createTeam(newTeam, this.teamMembers).subscribe({
        next: () => {
          this.translate.get('teamRegistration.add.success').subscribe((message: string) => alert(message)); 
          this.router.navigate(['/hackathons'])},
        error: (error: HttpErrorResponse) => this.translate.get('hackathonDetails.add.failure', { error: error.message }).subscribe((message: string) => alert(message))
      });
  }

}
