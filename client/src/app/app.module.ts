import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PartialsModule } from './partials/partials.module';
import { SurveyModule } from './survey/survey.module';
import { ModelModule } from './models/model.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PartialsModule,
    SurveyModule,
    ModelModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
