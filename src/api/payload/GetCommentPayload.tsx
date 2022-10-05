export class GetCommentPayload {
  feedId: number;
  page: number;

  constructor(feedId: number, page: number) {
    this.feedId = feedId;
    this.page = page;
  }
}
