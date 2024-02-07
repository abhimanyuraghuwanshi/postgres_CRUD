const { z } = require("zod");
const validate = require("../shared_modules/zodValidator");

exports.AdminLoginSchema = validate(
  z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6).max(10),
    }),
  })
);
