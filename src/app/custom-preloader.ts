import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export class BrowserCustomPreloader implements PreloadingStrategy {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  preload(route: Route, load: Function): Observable<any> {
    // only preload modules on the client, not server-side
    if (isPlatformBrowser(this.platformId)) {
      return route.data && route.data.preload ? load() : of(null);
    }
  }
}
