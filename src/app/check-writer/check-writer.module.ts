import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { CheckWriterComponent } from './check-writer.component';

const CHECK_WRITER_ROUTES: Routes = [
  {
    path: '',
    component: CheckWriterComponent
  }
];
@NgModule({
  declarations: [
    CheckWriterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // RouterModule.forChild(CHECK_WRITER_ROUTES),
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    CheckWriterComponent
  ]
})

export class CheckWriterModule {
  constructor() {
    console.log('check module loaded');
  }
}
