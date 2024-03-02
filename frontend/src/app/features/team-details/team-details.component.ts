import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competitor } from 'src/app/models/compitior.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  teamId: number = 0;
  competitors: Competitor[] = [];

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'))
      this.teamId = +params.get('id')!;
      this.loadCompetitors();
    });
  }

  loadCompetitors(): void {
    this.teamService.getCompetitorsByTeamId(this.teamId).subscribe(
      (competitors: Competitor[]) => {
        this.competitors = competitors;
        console.log(competitors)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
