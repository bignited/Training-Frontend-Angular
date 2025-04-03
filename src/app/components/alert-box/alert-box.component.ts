import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-alert-box',
  imports: [CommonModule],
  template: `
    <div *ngIf="errorMessage() || successMessage()" [ngClass]="{'alert-box': errorMessage(), 'success-box': successMessage()}">
      <div *ngIf="errorMessage()">
        <span class="closebtn" (click)="close()">&times;</span>
        <p>Could not enroll: {{errorMessage()}}</p>
      </div>
      <div *ngIf="successMessage()">
      <span class="closebtn" (click)="close()">&times;</span>
      <p>{{successMessage()}}</p>
    </div>
    </div>
  `,
  styles: `
  `
})
export class AlertBoxComponent {
  errorMessage = input<string | null>();
  successMessage = input<string | null>();

  closeEvent = output<void>();

  close() {
    this.closeEvent.emit();
  }
}