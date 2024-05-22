export const schemaBadRequestForSwagger = {
    type: 'object',
    properties: {
        errorsMessages: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    field: { type: 'string' },
                },
            },
        },
    },
}