import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hackathon } from '../../models/hackathon.model';
import { HackathonService } from '../../services/hackathon.service';

@Component({
  selector: 'app-hackathon-list',
  templateUrl: './hackathon-list.component.html',
  styleUrls: ['./hackathon-list.component.css']
})
export class HackathonListComponent implements OnInit {
  hackathons: Hackathon[] = [];

  constructor(private hackathonService: HackathonService, private router: Router) { }

  ngOnInit(): void {
    this.getHackathons();
  }

  getHackathons(): void {
    this.hackathonService.getHackathons()
      .subscribe((hackathons) => {
         this.hackathons = hackathons;
         console.log(hackathons)
      });
  }

  viewDetails(hackathon: Hackathon): void {
    this.router.navigate(['/hackathons', hackathon.hackathon_id]);
  }

  navigateToAddHackathon(): void {
    this.router.navigate(['/hackathons/add']);
  }
}