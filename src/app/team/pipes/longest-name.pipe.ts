import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longestName',
  standalone: true,
})
export class LongestNamePipe implements PipeTransform {
  transform(names: string[]): string {
    let longestName = '';
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      if (name.length > longestName.length) longestName = name;
    }

    return longestName;
  }
}
