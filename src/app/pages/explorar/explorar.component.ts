import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-explorar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.scss']
})
export class ExplorarComponent {

  programmers: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getProgrammers().subscribe(list => {
      this.programmers = list.filter(x => x.role === 'programmer');
    });
  }
}
