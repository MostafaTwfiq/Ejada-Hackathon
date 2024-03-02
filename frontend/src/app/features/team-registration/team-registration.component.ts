import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Competitor } from 'src/app/models/compitior.model';
import { Hackathon } from 'src/app/models/hackathon.model';
import { Team } from 'src/app/models/team.model';
import { HackathonService } from 'src/app/services/hackathon.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-registration',
  templateUrl: './team-registration.component.html',
  styleUrls: ['./team-registration.component.css']
})
export class TeamRegistrationComponent implements OnInit {
  teamName: string = '';
  selectedHackathonId: number = -1;
  teamMembers: Competitor[] = [];
  hackathon: Hackathon = {}
  maxSize: number = 0;
  challengeId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private hackathonService: HackathonService,
    private translate: TranslateService,
    private teamService: TeamService,
  ) { }

  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.selectedHackathonId = +params.get('hackathon_id')!;
    });
    
    this.hackathonService.getHackathonById(this.selectedHackathonId).subscribe((hackathon: any)=> {
      this.hackathon = hackathon.hackathon_details;
      this.hackathon.challenges = hackathon.challenges;
      this.maxSize = hackathon.hackathon_details.max_team_size == null ? 0 : hackathon.hackathon_details.max_team_size;
      console.log(this.maxSize)
    });
  }

  // Implement methods for adding/removing team members, submitting form
  // You can add these methods to handle member addition/removal and form submission
  addMember() {
    if (this.teamMembers.length < this.maxSize)
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
        hackathon_id: this.selectedHackathonId,
        challenge_id: this.challengeId
      };
      if(this.teamMembers.length<=0){
        this.translate.get('teamRegistration.add.sizeLimit').subscribe((message: string) => alert(message))
        return
      } else if (this.teamName == ''){
        this.translate.get('teamRegistration.add.emptyName').subscribe((message: string) => alert(message))
        return
      }
        
      // Call the team service method to register the new team
      this.teamService.createTeam(newTeam, this.teamMembers).subscribe({
        next: () => {
          this.translate.get('teamRegistration.add.success').subscribe((message: string) => alert(message)); 
          this.router.navigate(['/hackathons'])},
        error: (error: HttpErrorResponse) => this.translate.get('teamRegistration.add.failure', { error: error.message }).subscribe((message: string) => alert(message))
      });
  }

}
