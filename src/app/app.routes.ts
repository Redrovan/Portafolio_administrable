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
import { EditProgrammerComponent } from './pages/admin/manage-programmers/edit-programmer.component';

import { AvailabilityComponent } from './pages/admin/manage-availability/availability.component';
import { EditAvailabilityComponent } from './pages/admin/manage-availability/edit-availability.component';

// USERS NORMAL
import { ListUsersComponent } from './pages/admin/manage-users/list-users.component';
import { EditUserComponent } from './pages/admin/manage-users/edit-user.component';

// PROGRAMMER
import { DashboardProgrammerComponent } from './pages/programmer/dashboard-programmer/dashboard-programmer.component';
import { ListProjectsComponent } from './pages/programmer/projects/list-projects.component';
import { AddProjectComponent } from './pages/programmer/projects/add-project.component';
import { EditProjectComponent } from './pages/programmer/projects/edit-project.component';
import { ManageAppointmentsComponent } from './pages/programmer/appointments/manage-appointments.component';

// USER
import { PortfolioViewComponent } from './pages/user/portafolio-view/portfolio-view.component';
import { ScheduleAppointmentComponent } from './pages/user/schedule-appointment/schedule-appointment.component';

import { ExplorarComponent } from './pages/explorar/explorar.component';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'explorar', component: ExplorarComponent },

  // ============================
  // ADMIN
  // ============================
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [

      { path: 'dashboard', component: DashboardAdminComponent },

      // Usuarios normales
      { path: 'users', component: ListUsersComponent },
      { path: 'users/edit/:uid', component: EditUserComponent },

      // Programadores
      { path: 'programmers', component: ListProgrammersComponent },
      { path: 'programmers/new', component: AddProgrammerComponent },
      { path: 'programmers/edit/:uid', component: EditProgrammerComponent },

      // Disponibilidad
      { path: 'availability', component: AvailabilityComponent },
      { path: 'availability/edit/:id', component: EditAvailabilityComponent },
    ]
  },

  // ============================
  // PROGRAMADOR
  // ============================
  {
    path: 'programmer',
    canActivate: [programmerGuard],
    children: [
      { path: 'dashboard', component: DashboardProgrammerComponent },

      // Proyectos
      { path: 'projects', component: ListProjectsComponent },
      { path: 'projects/new', component: AddProjectComponent },
      { path: 'projects/edit/:id', component: EditProjectComponent },

      // Citas
      { path: 'appointments', component: ManageAppointmentsComponent },
    ]
  },

  // ============================
  // USUARIO NORMAL
  // ============================
  { path: 'portfolio/:uid', component: PortfolioViewComponent },
  { path: 'schedule/:uid', canActivate: [userGuard], component: ScheduleAppointmentComponent },

  // DEFAULT
  { path: '**', redirectTo: '' }
];
