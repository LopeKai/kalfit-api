import { IHpptRequest } from '../contracts/HttpRequest';
import { IHttpResponse } from '../contracts/HttpResponse';

export class HelloController {
    async handle(request: IHpptRequest): Promise<IHttpResponse<unknown>> {
        return {
            statusCode: 200,
            body: {
                request,
            },
        };
    }
}
