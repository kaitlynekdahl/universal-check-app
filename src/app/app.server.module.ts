// module dedicated to backend environment
// import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

// needed for SSR with BrowserAnimationsModule in app.browser.module
import { NoopAnimationsModule  } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    ServerModule,
    AppModule,
    NoopAnimationsModule,
    ModuleMapLoaderModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppServerModule { }
