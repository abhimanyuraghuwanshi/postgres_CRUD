const { z } = require("zod");
const validate = require("../shared_modules/zodValidator");

exports.LoginSchema = validate(
  z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6).max(10),
    }),
  })
);
exports.ChangePasswordSchema = validate(
  z.object({
    body: z.object({
      confirm_password: z.string().min(6).max(10),
      password: z.string().min(6).max(10),
    }),
  })
);
exports.RegistrationSchema = validate(
  z.object({
    body: z.object({
      first_name: z.string(),
      last_name: z.string(),
      email: z.string().email(),
      confirm_password: z.string().min(6).max(10),
      password: z.string().min(6).max(10),
    }),
  })
);
exports.ContactUsSchema = validate(
  z.object({
    body: z.object({
      name: z.string(),
      email: z.string().email(),
      text: z.string().max(100),
      subject: z.string().max(20),
    }),
  })
);
