import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { lambdaBodyParse } from '../utils/lambdaBodyParse';

export function lambdaHttpAdapter(controller: any) {
    return async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
        const body = lambdaBodyParse(event.body);
        const params = event.pathParameters ?? {};
        const queryParams = event.queryStringParameters ?? {};

        const response = controller.handler({
            params,
            queryParams,
            body,
        });

        return {
            statusCode: response.statusCode,
            body: response.body ? JSON.stringify(response.body) : undefined,
        };
    };
}
