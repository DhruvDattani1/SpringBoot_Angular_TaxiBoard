import { FormControl, FormGroup } from '@angular/forms';
import { dateRangeValidator } from './date-range.validator';

describe('dateRangeValidator', () => {
  function createGroup(startDate: string, endDate: string): FormGroup {
    return new FormGroup(
      {
        startDate: new FormControl(startDate),
        endDate: new FormControl(endDate)
      },
      { validators: dateRangeValidator }
    );
  }

  it('should return null when both fields are empty', () => {
    const group = createGroup('', '');
    expect(group.errors).toBeNull();
  });

  it('should return null when only startDate is set', () => {
    const group = createGroup('2025-01-01', '');
    expect(group.errors).toBeNull();
  });

  it('should return null when only endDate is set', () => {
    const group = createGroup('', '2025-01-31');
    expect(group.errors).toBeNull();
  });

  it('should return null when endDate is after startDate', () => {
    const group = createGroup('2025-01-01', '2025-01-31');
    expect(group.errors).toBeNull();
  });

  it('should return null when startDate and endDate are the same', () => {
    const group = createGroup('2025-01-15', '2025-01-15');
    expect(group.errors).toBeNull();
  });

  it('should return invalidDateRange error when endDate is before startDate', () => {
    const group = createGroup('2025-01-31', '2025-01-01');
    expect(group.errors).toEqual({ invalidDateRange: true });
  });
});
