module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Blog API CRUD operations'],
    description: 'View my Personal Profile',
    operationId: 'viewProfile',

    responses: {
      201: {
        description: 'Personal Profile sent Successfully',
      },
      500: {
        description: 'Server error',
      },
    },
  },
}
