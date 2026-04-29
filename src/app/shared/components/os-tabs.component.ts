import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-os-tabs',
  template: `
    <div class="os-tabs">
      <div class="os-tab-bar">
        <button [class.os-tab-active]="tab() === 'linux'" (click)="tab.set('linux')">
          🐧 Linux
        </button>
        <button [class.os-tab-active]="tab() === 'mac'" (click)="tab.set('mac')">
          🍎 macOS
        </button>
        <button [class.os-tab-active]="tab() === 'win'" (click)="tab.set('win')">
          🪟 Windows
        </button>
      </div>
      <div [hidden]="tab() !== 'linux'"><ng-content select="[linux]" /></div>
      <div [hidden]="tab() !== 'mac'"><ng-content select="[mac]" /></div>
      <div [hidden]="tab() !== 'win'"><ng-content select="[win]" /></div>
    </div>
  `
})
export class OsTabsComponent {
  tab = signal<'linux' | 'mac' | 'win'>('linux');
}
