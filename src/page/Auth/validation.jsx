import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("name is required")
      .min(3, "name must be at least 3 characters long"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .test("is-strong-password", "Password must be strong", (value) => {
        if (!value) return false;
        const strongPasswordPattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordPattern.test(value);
      })
      .required("Password is required"),
  });