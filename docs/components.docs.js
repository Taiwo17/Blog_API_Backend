module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        value: 'Bearer <JWT token here>',
      },
    },
    schemas: {
      id: {
        type: 'string',
        description: 'The id of the blog post',
        example: '0469c29e-453b-48c0-8093-93b7ac960604',
      },
      User: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Create a User',
            example: 'Shobo Taiwo',
          },
          email: {
            type: 'string',
            description: "Email's type",
            example: 'shobo@gmail.com',
          },
          password: {
            type: 'string',
            description: 'Password of the User',
            example: 'Shoboadefowope@@2007',
          },
          role: {
            type: 'string',
            default: 'author',
            enum: ['user', 'author', 'contributor'],
          },
        },
      },

      Blog: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Create a Blog',
            // example: 'Nodejs Developer',
          },
          description: {
            type: 'string',
            description: 'Lorem ispum 20',
            // example: 'shobo@gmail.com',
          },
          comments: {
            type: 'string',
            description: 'Comment of the user',
            // example: 'lovely post',
          },
        },
      },
    },
  },
}
