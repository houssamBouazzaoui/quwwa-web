import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClient } from '../../api/api-client.service';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

type ApiViewState =
  | { status: 'idle' }
  | {
      status: 'ok';
      meta: {
        name: string;
        env: string;
        version: string | null;
        commit: string | null;
        builtAt: string | null;
      };
    }
  | { status: 'error'; error: string };

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  private readonly api = inject(ApiClient);

  readonly apiState$: Observable<ApiViewState> = this.api.version().pipe(
    map((meta) => ({ status: 'ok' as const, meta })),
    startWith({ status: 'idle' as const }),
    catchError((err) =>
      of({
        status: 'error' as const,
        error: err?.message ?? (typeof err === 'string' ? err : JSON.stringify(err)),
      }),
    ),
  );
}
