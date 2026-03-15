import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, switchMap, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Trip, Zone, Vendor, PaymentType, PagedResult } from '../../models/models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trips',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './trips.html',
  styleUrl: './trips.css',
})
export class Trips implements OnInit, OnDestroy {

  filterForm!: FormGroup;
  trips: Trip[] = [];
  zones: Zone[] = [];
  vendors: Vendor[] = [];
  paymentTypes: PaymentType[] = [];
  currentPage = 0;
  totalPages = 0;


  trips$!: Observable<PagedResult<Trip>>;
  private paramsSubject = new BehaviorSubject<any>({});
  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadLookups();

    this.trips$ = this.paramsSubject.pipe(
      switchMap(params => this.api.getTrips(params)),
      tap(response => {
        this.totalPages = response.page.totalPages;
        this.currentPage = response.page.number;
      })
    );

    this.fetchTrips();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initializeForm(): void {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      passengers: [''],
      paymentType: [''],
      pickupZone: [''],
      vendor: [''],
      pageSize: [10]
    });
  }

  loadLookups(): void {
    this.subscriptions.add(
      this.api.getZones().subscribe(data => this.zones = data)
    );
    this.subscriptions.add(
      this.api.getVendors().subscribe(data => this.vendors = data)
    );
    this.subscriptions.add(
      this.api.getPaymentTypes().subscribe(data => this.paymentTypes = data)
    );
  }

  fetchTrips(page: number = 0): void {
    const form = this.filterForm.value;
    const params: any = {
      page,
      pageSize: form.pageSize || 10
    };
    if (form.startDate) params.startDate = form.startDate;
    if (form.endDate) params.endDate = form.endDate;
    if (form.passengers) params.passengers = form.passengers;
    if (form.paymentType) params.paymentType = form.paymentType;
    if (form.pickupZone) params.pickupZone = form.pickupZone;
    if (form.vendor) params.vendor = form.vendor;

    this.paramsSubject.next(params);
  }

  applyFilters(): void {
    this.currentPage = 0;
    this.fetchTrips(0);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.fetchTrips(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.fetchTrips(this.currentPage - 1);
    }
  }
}


