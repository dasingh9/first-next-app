export class ResponseBuilder {
    static success(data: any, statusCode = 200) {
        return new Response(JSON.stringify(data), {
            status: statusCode,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    static badRequest(errorMessage: string = 'Bad Request') {
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    static notFound(errorMessage: string = 'Not Found') {
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    static unauthorized(errorMessage: string = 'Unauthorized') {
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    static forbidden(errorMessage: string = 'Forbidden') {
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    static internalServerError(errorMessage: string = 'Internal Server Error') {
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    static created(data: any) {
        return new Response(JSON.stringify(data), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    static noContent() {
        return new Response(null, {
            status: 204,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}