export class Survey {
  constructor(
    public _id: string,
    public title: string,
    public questions: SurveyQuestion[],
    public description?: string
  ) {}
}

class SurveyQuestion {
  constructor(
    public question: string,
    public questionType: string,
    public options?: string[] | undefined
  ) {}
}
