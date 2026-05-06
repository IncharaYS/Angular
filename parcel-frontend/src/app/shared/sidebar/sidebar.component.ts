import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="list-group shadow-sm">
      @for (item of links; track item.path) {
        <a class="list-group-item list-group-item-action" [routerLink]="item.path" routerLinkActive="active">
          {{ item.label }}
        </a>
      }
    </aside>
  `
})
export class SidebarComponent {
  @Input() links: { label: string; path: string }[] = [];
}
