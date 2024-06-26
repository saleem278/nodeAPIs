import swaggerAutogen from "swagger-autogen";
const outputFile = "./swagger_output.json";
import Form from "../models/formModel.js";


const doc = {
  info: {
    version: "1.0.0",
    title: "My API",
    description:
      "Documentation automatically generated by the <b>swagger-autogen</b> module.",
  },
  host: "localhost:8000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be "header", "query" or "cookie"
      name: "Authorization", // name of the header, query parameter or cookie
      description: "any description...",
    },
  },
};
const endpointsFiles = ["../index.js"];
swaggerAutogen(outputFile, endpointsFiles, doc,Form);
