import { CommonModule } from '@angular/common';
import { Component, input, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './radio-input.component.html',
  styleUrl: './radio-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioInputComponent),
      multi: true,
    },
  ],
})
export class RadioInputComponent implements ControlValueAccessor {

  inputType = input<string>();
  labelName = input<string>();
  displayName = input<string>();
  inputId = input<string>();
 
  @Input() value!: string;
  selectedType: string = '';
  touched = false;

  onChange = (value: string) => { };
  onTouched = () => {
    this.touched = true;
  };

  writeValue(value: string): void {
    this.selectedType = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateValue(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.onChange(newValue);
  }

  handleBlur(): void {
    this.onTouched();  
  }
}