// src/app/app.config.ts
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';

export const appConfig = {
  providers: [
    provideRouter([]), // Si no usas rutas, puede quedar vacío.
    importProvidersFrom(HttpClientModule)
  ]
};
