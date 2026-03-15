import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  const start = control.get('startDate')?.value;
  const end = control.get('endDate')?.value;

  if (!start || !end) return null;

  const startDate = new Date(start);
  const endDate = new Date(end);

  return endDate < startDate ? { invalidDateRange: true } : null;
}
