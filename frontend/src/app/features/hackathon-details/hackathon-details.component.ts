import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { HackathonService } from 'src/app/services/hackathon.service';
import { Hackathon } from 'src/app/models/hackathon.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hackathon-details',
  templateUrl: './hackathon-details.component.html',
  styleUrls: ['./hackathon-details.component.css']
})
export class HackathonDetailsComponent implements OnInit {
  hackathon: Hackathon = {} as Hackathon; // Initialize with an empty object
  isAddMode: boolean = false;
  isEditMode: boolean = false; // Starts in view mode by default
  isViewMode: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private hackathonService: HackathonService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id == undefined) {
        this.isViewMode = false;
        this.isAddMode = true;
      } else if (id) {
        this.loadHackathonDetails(+id);
      }
    });
  }

  loadHackathonDetails(id: number): void {
    this.hackathonService.getHackathonById(id).subscribe({
      next: (data: Hackathon) => {
        this.hackathon = data;
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
      this.hackathonService.createHackathon(this.hackathon).subscribe({
        next: () => {
          this.translate.get('hackathonDetails.add.success').subscribe((message: string) => alert(message)); 
          this.router.navigate(['/hackathons'])},
        error: (error: HttpErrorResponse) => this.translate.get('hackathonDetails.add.failure', { error: error.message }).subscribe((message: string) => alert(message))
      });
    } else {
      this.hackathonService.updateHackathon(this.hackathon.hackathon_id, this.hackathon).subscribe({
        next: () => {
          this.translate.get('hackathonDetails.edit.success').subscribe((message: string) => alert(message)); 
          this.router.navigate(['/hackathons']);},
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
}