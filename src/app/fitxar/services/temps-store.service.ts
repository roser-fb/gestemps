import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TempsStoreService {
  private isRunning: string | null = null;
  private isPaused: string | null = null;
  private tmps: string | null = null;
  private time_ini: string | null = null;

  constructor() {}
  isTempRunning(): boolean {
    this.isRunning = this.getRunningToken();
    this.time_ini = this.getTimeInit();
    if (this.isRunning === 'true' && this.time_ini !== null) {
      return true;
    } else {
      return false;
    }
  }
  isTempPaused(): boolean {
    this.isPaused = this.getPausedToken();
    this.tmps = this.getTmps();
    if (this.isPaused === 'true' && this.tmps !== null) {
      return true;
    } else {
      return false;
    }
  }
  getRunningToken(): string | null {
    const token = localStorage.getItem('runningToken');
    return token !== null ? token : null;
  }

  setRunningToken(runningToken: string): void {
    this.isRunning = runningToken;
    localStorage.setItem('runningToken', runningToken);
  }
  deleteRunningToken(): void {
    localStorage.removeItem('runningToken');
  }
  getPausedToken(): string | null {
    const token = localStorage.getItem('pausedToken');
    return token !== null ? token : null;
  }

  setPausedToken(pausedToken: string): void {
    this.isPaused = pausedToken;
    localStorage.setItem('pausedToken', pausedToken);
  }
  deletePausedToken(): void {
    localStorage.removeItem('pausedToken');
  }
  getTimeInit(): string | null {
    const token = localStorage.getItem('timeInit');
    return token !== null ? token : null;
  }

  setTimeInit(timeInit: string): void {
    this.time_ini = timeInit;
    localStorage.setItem('timeInit', timeInit);
  }
  deleteTimeInit(): void {
    localStorage.removeItem('timeInit');
  }

  getTmps(): string | null {
    const token = localStorage.getItem('tmps');
    return token !== null ? token : null;
  }

  setTmps(tmps: number): void {
    this.tmps = tmps + '';
    localStorage.setItem('tmps', this.tmps);
  }
  deleteTmps(): void {
    localStorage.removeItem('tmps');
  }
}
