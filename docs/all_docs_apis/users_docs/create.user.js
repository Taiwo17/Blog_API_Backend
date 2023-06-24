module.exports = {
  post: {
    tags: ['Blog API CRUD operations'],
    description: 'Create User',
    operationId: 'createUser',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/User',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'User created successfully',
      },
      500: {
        description: 'Server error',
      },
    },
  },
}
