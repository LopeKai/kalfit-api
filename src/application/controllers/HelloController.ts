import { z } from 'zod';
import { IController } from '../contracts/Controller';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Name is required').email('Invalid email'),
});

export class HelloController implements IController<unknown> {
    async handle(request: IController.Request): Promise<IController.Response<unknown>> {
        const parsedBody = schema.safeParse(request.body);

        return {
            statusCode: 200,
            body: {
                parsedBody,
            },
        };
    }
}
