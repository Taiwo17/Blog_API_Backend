module.exports = {
  post: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Blog API CRUD operations'],
    description: 'Create Blog',
    operationId: 'createBlog',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Blog',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Blog created successfully',
      },
      500: {
        description: 'Server error',
      },
    },
  },
}
