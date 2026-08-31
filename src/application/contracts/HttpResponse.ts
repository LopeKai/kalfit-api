export interface IHttpResponse<TBody = undefined> {
    statusCode: number;
    body?: TBody;
}
