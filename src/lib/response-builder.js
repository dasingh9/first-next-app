export class ResponseBuilder {
    static successResponse(data, statusCode=200) {
        return new Response(JSON.stringify(data), {
            status: statusCode,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static badRequest(errorMessage) {
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}