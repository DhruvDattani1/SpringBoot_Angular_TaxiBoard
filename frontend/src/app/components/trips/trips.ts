import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { Trip, Zone, Vendor, PaymentType, PagedResult } from '../../models/models';
@Component({
  selector: 'app-trips',
  templateUrl: './trips.html',
  styleUrl: './trips.css',
})
export class Trips {

  filterForm!: FormGroup;
  trips: Trip[] = [];
  zones: Zone[] = [];
  vendors: Vendor[] = [];
  paymentTypes: PaymentType[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;
  loading = false;

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadLookups();
    this.getTrips();
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
      pageSize: [''],

    })
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

    getTrips(page: number = 0): void {
    this.loading = true;
    const form = this.filterForm.value;

    const params: any = {
      page: page,
      pageSize: form.pageSize
    };

    if (form.startDate) params.startDate = form.startDate;
    if (form.endDate) params.endDate = form.endDate;
    if (form.passengers) params.passengers = form.passengers;

    this.subscriptions.add(
      this.api.getTrips(params).subscribe((response: PagedResult<Trip>) => {
        this.trips = response.content;
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
        this.loading = false;
      })
    );
  }

  applyFilters(): void {
    this.currentPage = 0;
    this.getTrips(0);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.getTrips(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getTrips(this.currentPage - 1);
    }
  }
}


