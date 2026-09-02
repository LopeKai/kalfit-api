import z from 'zod';

export abstract class Controller<TBody = undefined> { //Classe abstrata: não posso criar instância dela. Ela serve como contrato para outras classes estenderem.
    protected schema?: z.ZodSchema;

    protected abstract handle(request: Controller.Request): Promise<Controller.Response<TBody>>;

    public execute(request: Controller.Request): Promise<Controller.Response<TBody>> {
        const body = this.validateBody(request.body);

        return this.handle({
            ...request,
            body: body as Record<string, unknown>,
        });
    }

    private validateBody(body: Controller.Request['body']) {
        // validar o schema do zod
        if (!this.schema) {
            return body;
        };

        return this.schema.parse(body);
    }
}

export namespace Controller {
    export type Request<
        TBody = Record<string, unknown>,
        TParams = Record<string, unknown>,
        TQueryParams = Record<string, unknown>
    > = {
        body: TBody;
        params: TParams;
        queryParams: TQueryParams;
    };

    export type Response<TBody = undefined> = {
        statusCode: number;
        body?: TBody;
    };
}
