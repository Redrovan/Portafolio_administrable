import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

// GUARDS
import { adminGuard } from './guards/admin.guard';
import { programmerGuard } from './guards/programmer.guard';
import { userGuard } from './guards/user.guard';

// ADMIN
import { DashboardAdminComponent } from './pages/admin/dashboard-admin/dashboard-admin.component';
import { ListProgrammersComponent } from './pages/admin/manage-programmers/list-programmers.component';
import { AddProgrammerComponent } from './pages/admin/manage-programmers/add-programmer.component';
import { AvailabilityComponent } from './pages/admin/manage-availability/availability.component';

// PROGRAMMER
import { DashboardProgrammerComponent } from './pages/programmer/dashboard-programmer/dashboard-programmer.component';
import { ListProjectsComponent } from './pages/programmer/projects/list-projects.component';
import { AddProjectComponent } from './pages/programmer/projects/add-project.component';
import { ManageAppointmentsComponent } from './pages/programmer/appointments/manage-appointments.component';

// USER
import { PortfolioViewComponent } from './pages/user/portafolio-view/portfolio-view.component';
import { ScheduleAppointmentComponent } from './pages/user/schedule-appointment/schedule-appointment.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  // ADMIN
  { path: 'admin', canActivate: [adminGuard], children: [
    { path: 'dashboard', component: DashboardAdminComponent },
    { path: 'programmers', component: ListProgrammersComponent },
    { path: 'programmers/new', component: AddProgrammerComponent },
    { path: 'availability', component: AvailabilityComponent },
  ]},

  // PROGRAMMER
  { path: 'programmer', canActivate: [programmerGuard], children: [
    { path: 'dashboard', component: DashboardProgrammerComponent },
    { path: 'projects', component: ListProjectsComponent },
    { path: 'projects/new', component: AddProjectComponent },
    { path: 'appointments', component: ManageAppointmentsComponent },
  ]},

  // USER NORMAL
  { path: 'portfolio/:uid', component: PortfolioViewComponent },
  { path: 'schedule/:uid', canActivate: [userGuard], component: ScheduleAppointmentComponent },

  { path: '**', redirectTo: '' }
];
