import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
