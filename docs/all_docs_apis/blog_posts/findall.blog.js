module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Blog API CRUD operations'],
    description: 'Find all Posts by a particular user',
    operationId: 'getAllPosts',
    responses: {
      201: {
        description: 'Fetch all post successfully',
      },
      500: {
        description: 'Server error',
      },
    },
  },
}
