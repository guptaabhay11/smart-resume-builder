import userRoute from "../user/user.routes";
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Backend API Documentation",
    version: "1.0.0",
    description: "API documentation for the Resume Builder Application",
    contact: {
      email: "guptaabhay.75way@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Development server",
    },
  ],
  paths: {
    ...userRoute,

  },
};

export default swaggerDocument;