import { Component } from '@angular/core';
import { TeamFormComponent } from './team';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TeamFormComponent],
  template: `
    <div class=" flex justify-center items-center h-screen">
      <app-team-form></app-team-form>
    </div>
  `,
})
export class AppComponent {}
