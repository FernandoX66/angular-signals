import { NgFor } from '@angular/common';
import {
  Component,
  signal,
  computed,
  effect,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

import { LocalStorageService } from '../services/local-storage.service';
import { LongestNamePipe } from '../pipes/longest-name.pipe';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [FormsModule, NgFor, LongestNamePipe],
  templateUrl: './team-form.component.html',
})
export class TeamFormComponent implements OnInit {
  // name = 'Anonymous';
  name = signal('Anonymous');
  // teammates = ['Juan', 'Pablo'];
  teammates = signal<string[]>(['Juan', 'Pablo']);
  teammatesLength = computed(() => {
    return this.name().length;
  });
  age = signal(0);
  ageOfBirth = computed(() => {
    const ageOfBirth = new Date().getFullYear() - this.age();
    return ageOfBirth;
  });
  #localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    effect(() => {
      this.#localStorageService.setItem('teammates', this.teammates());
    });
  }

  onNameChange(nameModel: NgModel): void {
    this.name.set(nameModel.value);
    nameModel.reset();
  }

  onTeammateAdd(teammateModel: NgModel): void {
    // this.teammates.push(teammateModel.value);

    // this.teammates.mutate((teammates) => {
    //   teammates.push(teammateModel.value);
    // });

    this.teammates.update((teammates) => {
      return [...teammates, teammateModel.value];
    });

    teammateModel.reset();
  }

  onAgeChange(ageModel: NgModel): void {
    this.age.set(ageModel.value);
  }
}
