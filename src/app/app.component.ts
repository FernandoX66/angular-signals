import { NgFor } from '@angular/common';
import { Component, computed, signal, effect, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { LongestNamePipe } from './pipes/longest-name.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgFor, LongestNamePipe],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  birthYear = signal<number>(0);
  currentYear = new Date().getFullYear();
  age = computed(() => {
    return this.currentYear - this.birthYear();
  });
  teammates = signal<string[]>(['Juan', 'Carlos']);

  ngOnInit(): void {
    effect(() => {
      console.log(this.teammates());
    });
  }

  onBirthYearChange(ngModel: NgModel): void {
    const birthYear = ngModel.value as number;
    if (birthYear < 1000 || birthYear > this.currentYear) return;

    this.birthYear.set(ngModel.value);
  }

  onTeammateAdded(ngModel: NgModel): void {
    const memberName = ngModel.value as string;

    this.teammates.update((currentTeammates) => {
      const updatedTeammates = [...currentTeammates, memberName];

      return updatedTeammates;
    });

    ngModel.reset();
  }

  // onTeammateAdded(ngModel: NgModel): void {
  //   const memberName = ngModel.value as string;

  //   this.teammates.mutate((currentTeammates) => {
  //     currentTeammates.push(memberName);
  //   });

  //   ngModel.reset();
  // }
}
