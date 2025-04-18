import { CommonModule } from '@angular/common';
import { Component, input, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {

  inputType = input<string>();
  labelName = input<string>();
  displayName = input<string>();
  inputId = input<string>();
  minDate = input<string>();
  maxDate = input<string>();
  maxLength = input<number>(30); 
  isLogin = input<boolean>(false);
  @Input() hasError: boolean | undefined = false;
   
  value: string = '';
  touched = false;

  onChange = (value: string) => { };
  onTouched = () => {
    this.touched = true;
  };

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateValue(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.onChange(newValue);
  }

  handleBlur(): void {
    this.onTouched();  
  }
}