import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-box',
  imports: [],
  template: `
    <div class="alert-box">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
      Could not enroll: {{errorMessage}} 
    </div>
  `,
  styles: `
  `
})
export class AlertBoxComponent {
  @Input() errorMessage!:string;
}
