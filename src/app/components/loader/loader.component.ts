import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
 template: `
    <div class="overlay" *ngIf="loaderService.loading$ | async">
      <div class="spinner"></div>
    </div>
  `,
    styleUrl: './loader.component.css'
})
export class LoaderComponent {
 constructor(public loaderService: LoaderService) {}
}
