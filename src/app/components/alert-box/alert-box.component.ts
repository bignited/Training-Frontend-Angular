import { CommonModule } from '@angular/common';
import { Component, Input, input, output } from '@angular/core';

@Component({
  selector: 'app-alert-box',
  imports: [CommonModule],
  templateUrl: 'alert-box.component.html',
  styleUrl: 'alert-box.component.scss'
})
export class AlertBoxComponent {
  errorMessage = input<string | null>();
  successMessage = input<string | null>();
  messageStart = input<string>(); 

  closeEvent = output<void>();

  ngOnInit() {
    if (this.errorMessage() || this.successMessage()) {
      setTimeout(() => {
        this.close();
      }, 3000);  
    }
  }
  
  close() {
    this.closeEvent.emit();
  }
  
}