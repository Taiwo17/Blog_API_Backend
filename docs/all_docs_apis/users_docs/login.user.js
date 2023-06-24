module.exports = {
  post: {
    tags: ['Blog API CRUD operations'],
    description: 'Login User',
    operationId: 'loginUser',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                example: 'shobo@gmail.com',
                description: 'Type in your valid email address',
              },
              password: {
                type: 'string',
                example: 'Shoboadefowope@@2007',
                description: 'Type in your valid password',
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Login successfully',
      },
      500: {
        description: 'Server error',
      },
    },
  },
}
