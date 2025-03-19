export const checkIfSignInFormIsValid = (signInFormData) => {
    return (
      signInFormData &&
      signInFormData.email !== "" &&
      signInFormData.password !== ""
    );
  };

  export const checkIfSignUpFormIsValid = (signUpFormData) => {
    return signUpFormData &&
    signUpFormData.userName!==""&&
      signUpFormData.email !== "" &&
      signUpFormData.password !== ""
      ? true
      : false;
  };