import { NgModule } from '@angular/core';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { DoSurveyComponent } from './do-survey/do-survey.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';

@NgModule({
  declarations: [SurveyListComponent, DoSurveyComponent, AddSurveyComponent, EditSurveyComponent, SurveyResultsComponent],
  exports: [SurveyListComponent],
})
export class SurveyModule {}
