import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Analytics } from '../../models/models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css',
})
export class AnalyticsC implements OnInit {

  filterForm!: FormGroup;
  analytics$!: Observable<Analytics>;
  private paramsSubject = new BehaviorSubject<any>({});

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.analytics$ = this.paramsSubject.pipe(
      switchMap(params => this.api.getAnalytics(params))
    );

    this.fetchAnalytics();
  }

  initializeForm(): void {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
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
