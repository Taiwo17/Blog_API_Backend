module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Get all Single post'],
    description: 'Get Individual Post',
    operationId: 'getIndividualPost',
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          $ref: '#/components/schemas/id',
        },
        description: 'Get a single blog post',
      },
    ],
    responses: {
      201: {
        description: 'Fetch Single post successfully',
      },
      500: {
        description: 'Server error',
      },
    },
  },
}
