export default {
  register: {
    title: 'Register for your account',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    confirmPassword: 'Confirm Password',
    submitBtn: 'Sign up',
    passwordStrength: {
      minLength: '8 characters min.',
      hasUppercase: '1 uppercase',
      hasLowercase: '1 lowercase',
    },
    placeholder: {
      email: 'Enter your email',
      name: 'Enter your name',
      password: 'Enter your password',
      confirmPassword: 'Enter your confirm password',
    },
    validation: {
      emailEmpty: 'Please enter your email.',
      emailInvalidFormat: 'Invalid email address format.',
      emailExist: 'The email already exists.',
      nameEmpty: 'Please enter your name.',
      passwordEmpty: 'Please enter your password.',
      confirmPasswordEmpty: 'Please enter your confirm password.',
      confirmPasswordDontMatch: 'The new password that you entered do not match!',
      passwordWeak: 'Please enter your strong password !',
    },
    message: {
      success: 'Congratulations, your account has been successfully created.',
      failure: 'Something went wrong. Please try again!',
    },
  },
  login: {
    title: 'Login for your account',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    btnSubmit: 'Sign in',
    noAccount: "Don't have an account?",
    signup: 'Sign up',
    placeholder: {
      email: 'Enter your email',
      password: 'Enter your password',
    },
    validation: {
      emailEmpty: 'Please enter your email.',
      emailInvalidFormat: 'Invalid email address format.',
      emailDontExist: 'The email do not exist.',
      passwordEmpty: 'Please enter your password.',
      passwordIncorrect: 'Your password is incorrect.',
    },
    message: {},
  },
  forgot: {
    title: 'Reset your password',
    submitBtn: 'Email me',
    email: 'Enter your email address',
    validation: {
      emailEmpty: 'Please enter your email.',
      emailInvalidFormat: 'Invalid email address format.',
      emailExist: 'The email already exists.',
    },
    message: {
      success: 'Congratulations, your account has been successfully created.',
      failure: 'Something went wrong. Please try again!',
    },
  },
};
