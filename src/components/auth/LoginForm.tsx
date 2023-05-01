import React, { useContext } from "react";
import { Formik, Field, Form, FieldProps } from "formik";
import { schemaLogin } from "./schema";
import styles from "./style.module.scss";
import { Button, Divider, Input, Modal } from "antd";
import { LoginModalContext } from "../../context/modal.context";
import { GoogleIcon } from "@/assets/icons";
import { useSession, signIn } from "next-auth/react";

const LoginForm = ({}) => {
  const { isModalOpen, toggleModal } = useContext(LoginModalContext);

  const { status } = useSession();
  const handleSignInOAuth = () => {
    signIn("google", { callbackUrl: "/profile" });
  };

  if (status === "loading") return <h1> loading... please wait</h1>;

  return (
    <Modal
      title="Welcome!"
      open={isModalOpen}
      onCancel={toggleModal}
      footer={[]}
    >
      <div className={styles.googleBtn}>
        <Button icon={<GoogleIcon />} onClick={handleSignInOAuth}>
          Login with Google
        </Button>
      </div>
      <div className={styles.dividerWrapper}>
        <Divider /> OR <Divider />
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log(JSON.stringify(values, null, 2));
        }}
        validationSchema={schemaLogin}
      >
        <Form className={styles.formWrapper}>
          <Field name="email">
            {({ field, meta }: FieldProps) => {
              return (
                <>
                  <label className={styles.labelWrapper}>Email</label>
                  <Input
                    placeholder="Enter your email"
                    className={styles.inputWrapper}
                    {...field}
                  />
                  <div className={styles.error}>
                    {meta.touched && meta.error}
                  </div>
                </>
              );
            }}
          </Field>
          <Field name="password">
            {({ field, meta }: FieldProps) => {
              return (
                <>
                  <label className={styles.labelWrapper}>Password</label>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    className={styles.inputWrapper}
                    {...field}
                  />
                  <div className={styles.error}>
                    {meta.touched && meta.error}
                  </div>
                </>
              );
            }}
          </Field>
          <div>
            <Button htmlType="submit">Log In</Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default LoginForm;
