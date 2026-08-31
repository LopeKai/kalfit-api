// Contracts -> sao outras pessoas vao ter implementar.

export interface IHpptRequest<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParams = Record<string, unknown>
    > {
    body: TBody;
    params: TParams;
    queryParams: TQueryParams;
};
