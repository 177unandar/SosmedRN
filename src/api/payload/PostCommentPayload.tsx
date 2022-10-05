export class PostCommentPayload {
  feedId: number;
  comment: string;

  constructor(feedId: number, comment: string) {
    this.feedId = feedId;
    this.comment = comment;
  }
}
