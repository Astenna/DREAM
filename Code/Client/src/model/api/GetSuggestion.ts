export interface Suggestion {
  id: number;
  text: string;
}

export interface GetSuggestionResponse extends Array<Suggestion> {
}