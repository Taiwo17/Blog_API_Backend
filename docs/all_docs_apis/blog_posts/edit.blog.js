module.exports = {
  put: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Editing Post by the Owner of the Post'],
    description: 'Editing a single post by a user',
    operationId: 'editIndividualpost',
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          $ref: '#/components/schemas/id',
        },
        description: 'Edit a single blog post',
      },
    ],
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
        description: 'Edited Single post successfully',
      },
      500: {
        description: 'Server error',
      },
    },
  },
}
