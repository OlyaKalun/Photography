import * as yup from "yup";

export const messages = {
  PROMPT_MAIL: "Enter your email address",
  PROMPT_PASSWORD: "Enter your password",
  REQUIRE_MESSAGE: "Required field",
};

export const schemaLogin = yup.object().shape({
  email: yup
    .string(messages.PROMPT_MAIL)
    .email(messages.PROMPT_MAIL)
    .required(messages.REQUIRE_MESSAGE),
  password: yup
    .string(messages.PROMPT_PASSWORD)
    .required(messages.REQUIRE_MESSAGE),
});
