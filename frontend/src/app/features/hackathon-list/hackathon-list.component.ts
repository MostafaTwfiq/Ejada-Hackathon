import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hackathon } from '../../models/hackathon.model';
import { HackathonService } from '../../services/hackathon.service';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RoleEnum } from 'src/enums/role.enum';

@Component({
  selector: 'app-hackathon-list',
  templateUrl: './hackathon-list.component.html',
  styleUrls: ['./hackathon-list.component.css']
})
export class HackathonListComponent implements OnInit {
  hackathons: Hackathon[] = [];
  currentUser?: User | null;
  RoleEnum = RoleEnum;

  constructor(private hackathonService: HackathonService,
    private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getHackathons();
    this.currentUser = this.authService.currentUserValue;
  }

  getHackathons(): void {
    this.hackathonService.getHackathons()
      .subscribe((hackathons) => {
         this.hackathons = hackathons;
      });
  }

  viewDetails(hackathon: Hackathon): void {
    this.router.navigate(['/hackathons', hackathon.hackathon_id]);
  }

  navigateToAddHackathon(): void {
    this.router.navigate(['/hackathons/add']);
  }
}