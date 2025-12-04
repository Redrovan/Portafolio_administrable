import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  programmers: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getProgrammers().subscribe(list => {
      this.programmers = list.filter(p => p.role === 'programmer');
    });
  }
}
