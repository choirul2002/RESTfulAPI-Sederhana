export const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "RESTful-API Manajemen",
      description: "Daftar API Manajemen",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "localhost",
      },
    ],
    tags: [
      {
        name: "Mahasiswa",
        description: "Mahasiswa",
      },
      {
        name: "Jurusan",
        description: "Jurusan",
      },
    ],
    paths: {
      "/mahasiswa": {
        get: {
          tags: ["Mahasiswa"],
          summary: "Get All Mahasiswa",
          description: "",
          responses: {
            200: {
              description: "Success",
            },
            404: {
              description: "Not Found",
            },
          },
        },
        post: {
          tags: ["Mahasiswa"],
          summary: "Post Mahasiswa",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    nim: {
                      type: "string",
                    },
                    nama: {
                      type: "string",
                    },
                    kd_jurusan: {
                      type: "string",
                    },
                    alamat: {
                      type: "string",
                    },
                    angkatan: {
                      type: "string",
                    },
                    foto: {
                      type: "string",
                      format: "binary",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
            },
          },
        },
      },
      "/mahasiswa/{nim}": {
        get: {
          tags: ["Mahasiswa"],
          summary: "Get One Mahasiswa",
          description: "",
          parameters: [
            {
              in: "path",
              name: "nim",
              schema: {
                type: "integer",
              },
              description: "Nim Mahasiswa",
              required: true,
            },
          ],
          responses: {
            200: {
              description: "Success",
            },
          },
        },
        put: {
          tags: ["Mahasiswa"],
          summary: "Update Mahasiswa",
          parameters: [
            {
              in: "path",
              name: "nim",
              schema: {
                type: "integer",
              },
              description: "Nim Mahasiswa",
              required: true,
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    nama: {
                      type: "string",
                    },
                    kd_jurusan: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
            },
          },
        },
        delete: {
          tags: ["Mahasiswa"],
          summary: "Delete Mahasiswa",
          parameters: [
            {
              in: "path",
              name: "nim",
              schema: {
                type: "integer",
              },
              description: "Nim Mahasiswa",
              required: true,
            },
          ],
          responses: {
            200: {
              description: "Success",
            },
          },
        },
      },
      "/mahasiswa/search?keyword=": {
        get: {
          tags: ["Mahasiswa"],
          summary: "Search Mahasiswa",
          description: "",
          parameters: [
            {
              in: "query",
              name: "keyword",
              schema: {
                type: "string",
              },
              description: "Nim / Mahasiswa",
            },
          ],
          responses: {
            200: {
              description: "Success",
            },
          },
        },
      },
    },
  },
  apis: ["./public-api.js"],
};
