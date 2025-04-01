import { NgFor } from '@angular/common';
import { Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  imports: [NgFor],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {

  name = input<string>(); 
  items = input<any[]>([]); 
  displayName = input<string>();
  selectedValue = ''; 

  selectionChange = output<string>();

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelectChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedValue = value;
    this.onChange(value);
    this.selectionChange.emit(value);
  }
}
