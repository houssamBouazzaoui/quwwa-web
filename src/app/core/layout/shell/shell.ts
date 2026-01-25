import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClient } from '../../api/api-client.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell implements OnInit {
  instanceId = Math.random().toString(16).slice(2, 10);

  apiStatus: 'idle' | 'ok' | 'error' = 'idle';
  apiError: string | null = null;

  constructor(
    private readonly api: ApiClient,
    private readonly cdr: ChangeDetectorRef,
  ) {
    console.log(`[Shell ${this.instanceId}] constructor`);
  }

  ngOnInit(): void {
    console.log(`[Shell ${this.instanceId}] ngOnInit start`);
    this.api.healthDb().subscribe({
      next: (res) => {
        console.log(`[Shell ${this.instanceId}] healthDb ok:`, res);
        this.apiStatus = 'ok';
        this.apiError = null;

        // ✅ force the view to update no matter what
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(`[Shell ${this.instanceId}] healthDb error:`, err);
        this.apiStatus = 'error';
        this.apiError = err?.message ?? (typeof err === 'string' ? err : JSON.stringify(err));

        this.cdr.detectChanges();
      },
    });
  }
}
