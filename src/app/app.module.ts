import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
// import { BrowserPrebootModule } from 'preboot/browser';
import { PrebootModule } from 'preboot';

import { AppComponent } from './app.component';
import { CheckWriterModule } from './check-writer/check-writer.module';
import { CheckWriterComponent } from './check-writer/check-writer.component';
import { BrowserCustomPreloader } from './custom-preloader';

const ROUTES: Routes = [
  {
    path: 'check',
    component: CheckWriterComponent
  },
  // {
  //   path: 'check',
  //   loadChildren: 'app/check-writer/check-writer.module#CheckWriterModule',
  //   data: {preload: true}
  // },
  {
    path: '',
    redirectTo: '/check',
    pathMatch: 'full'
  }
];

// dummy functions to see preboot events
export function myFunction () {
  console.log(123456);
}

export function myOtherFunction () {
  console.log(789432);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CheckWriterModule,
    BrowserModule.withServerTransition({appId: 'universal-check-writer'}),
    // BrowserPrebootModule.replayEvents(),
    PrebootModule.withConfig({
        appRoot: 'app-root',
        eventSelectors: [
          { selector: 'input', events: ['keypress', 'keyup', 'keydown', 'input', 'change'], action: myFunction },
          { selector: 'input', events: ['keyup'], preventDefault: true, keyCodes: [13], freeze: true, action: myOtherFunction }
        ]
      }),
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forRoot(ROUTES,
      {preloadingStrategy: BrowserCustomPreloader,
      initialNavigation: 'enabled'})
  ],
  providers: [
    BrowserCustomPreloader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
