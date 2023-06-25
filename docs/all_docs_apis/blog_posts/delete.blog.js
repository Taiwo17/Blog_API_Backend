module.exports = {
  delete: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Deleting Post by the Owner of the Post'],
    description: 'Deleting a single post by a user',
    operationId: 'deleteIndividualpost',
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          $ref: '#/components/schemas/id',
        },
        description: 'Delete a single blog post',
      },
    ],
    responses: {
      201: {
        description: 'Delete Single post successfully',
      },
      500: {
        description: 'Server error',
      },
    },
  },
}
