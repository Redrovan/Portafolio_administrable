import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailabilityService } from '../../../services/availability.service';
import { Availability } from '../../../models/availability.model';

@Component({
  selector: 'app-edit-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-availability.component.html',
  styleUrls: ['./edit-availability.component.scss']
})
export class EditAvailabilityComponent {

  availability: Availability | null = null;
  id = '';

  constructor(
    private route: ActivatedRoute,
    private service: AvailabilityService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.service.getById(this.id).subscribe(a => {
      if (a) this.availability = a as Availability;
    });
  }

  save() {
    if (!this.availability) return;

    this.service.update(this.id, this.availability)
      .then(() => this.router.navigate(['/admin/availability']));
  }
}
