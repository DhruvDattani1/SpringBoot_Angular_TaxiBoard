import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Analytics } from '../../models/models';
import { RouterModule } from '@angular/router';
import { dateRangeValidator } from '../../validators/date-range.validator';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AnalyticsC implements OnInit {

  filterForm!: FormGroup;
  analytics$!: Observable<Analytics>;
  private paramsSubject = new BehaviorSubject<any>({});

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  isLoading = false;
  showToast = false;

  ngOnInit(): void {
    this.initializeForm();

    this.analytics$ = this.paramsSubject.pipe(
      tap(() => { this.isLoading = true; this.cdr.markForCheck(); }),
      switchMap(params => this.api.getAnalytics(params)),
      tap(() => {
        this.isLoading = false;
        this.showToast = true;
        this.cdr.markForCheck();
         setTimeout(() => {
           this.showToast = false;
           this.cdr.markForCheck();
         }, 2000);
      }),
    );

    this.fetchAnalytics();
  }

  initializeForm(): void {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    },
    { validators: dateRangeValidator}
  );
  }

  fetchAnalytics(): void {
    const form = this.filterForm.value;
    const params: any = {};
    if (form.startDate) params.startDate = form.startDate;
    if (form.endDate) params.endDate = form.endDate;
    this.paramsSubject.next(params);
  }

  applyFilters(): void {
    this.fetchAnalytics();
  }

  resetFilters(): void {
    this.initializeForm();
    this.fetchAnalytics();
  }
}
