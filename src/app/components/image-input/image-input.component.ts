import { CommonModule } from '@angular/common';
import { Component, input, forwardRef, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-image-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ImageInputComponent),
    multi: true
  }]
})
export class ImageInputComponent implements ControlValueAccessor {

  labelName = input<string>();
  displayName = input<string>();
  inputId = input<string>();
 
  imageTooLarge = output<number>();
  errorMessage: string = ''; 

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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
     
    if (!input.files || input.files.length === 0) {
      this.errorMessage = 'No file selected.';
      return;
    }

    const file = input.files?.[0];

    const maxSize = 5 * 1024 * 1024;
    if (file.size >= maxSize) {
      this.imageTooLarge.emit(file.size); 
      this.value = '';
      this.onChange(this.value);
      return;
    }
    
    this.errorMessage = '';
    this.convertFileToBase64(file).subscribe(base64 => {
      this.value = base64;
      this.onChange(this.value);
    });
  }

  convertFileToBase64(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => result.next(reader.result as string);
    reader.onerror = (error) => result.error(error);
    
    return result;
  }
}