import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { lambdaBodyParse } from '../utils/lambdaBodyParse';
import { Controller } from '../../application/contracts/Controller';
import { ZodError } from 'zod';

export function lambdaHttpAdapter<TBody>(controller: Controller<TBody>) {
    return async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
        try {
            const body = lambdaBodyParse(event.body);
            const params = event.pathParameters ?? {};
            const queryParams = event.queryStringParameters ?? {};

            const response = await controller.execute({
                params,
                queryParams,
                body,
            });

            return {
                statusCode: response?.statusCode,
                body: response.body ? JSON.stringify(response.body) : undefined,
            };
        } catch (error) {
            if (error instanceof ZodError) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        erro: {
                            code: 'VALIDATION',
                            message: error.issues.map(issue => ({
                                field: issue.path.join('.'),
                                error: issue.message,
                            })),
                        },
                    }),
                };
            }

            return {
                statusCode: 500,
                body: JSON.stringify({
                    erro: {
                        code: 'INTERNAL_SERVER_ERROR',
                        message: 'Internal server error.',
                    },
                }),
            };
        }
    };
}
