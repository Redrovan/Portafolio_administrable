// src/app/pages/home/home.component.ts 
import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
 import{ UsersService } from '../../services/users.service'; 
 import { AuthService } from '../../services/auth.service'; 
 import { Router, RouterModule } from '@angular/router'; 
  
  
  @Component({ selector: 'app-home', 
    standalone: true, 
    templateUrl: './home.component.html', 
    styleUrls: ['./home.component.scss'], 
    imports: [CommonModule, RouterModule] }) 
    
    export class HomeComponent { 
        programmers: any[] = []; 
        user: any = null; 
        
    constructor( 
        private usersService: UsersService, 
        private authService: AuthService, 
        private router: Router ) 
        {} ngOnInit() { 
            this.authService.user$.subscribe(u => this.user = u); 
            this.usersService.getProgrammers().subscribe(users => { 
                this.programmers = users.filter(u => u.role === 'programmer'); }); 
            } viewPortfolio(p: any) { this.router.navigate(['/portfolio', p.uid]); 
                
            } schedule(p: any) { this.router.navigate(['/schedule', p.uid]); } }