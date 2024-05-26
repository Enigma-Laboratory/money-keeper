export default {
  register: {
    title: 'Đăng ký tài khoản của bạn',
    email: 'Email',
    password: 'Mật khẩu',
    name: 'Tên',
    confirmPassword: 'Xác nhận mật khẩu',
    submitBtn: 'Đăng ký',
    placeholder: {
      email: 'Nhập email của bạn',
      name: 'Nhập tên của bạn',
      password: 'Nhập mật khẩu của bạn',
      confirmPassword: 'Nhập lại mật khẩu của bạn',
    },
    validation: {
      emailEmpty: 'Vui lòng nhập email của bạn.',
      emailInvalidFormat: 'Định dạng email không hợp lệ.',
      emailExist: 'Email đã tồn tại.',
      nameEmpty: 'Vui lòng nhập tên của bạn.',
      passwordEmpty: 'Vui lòng nhập mật khẩu của bạn.',
      confirmPasswordEmpty: 'Vui lòng nhập lại mật khẩu của bạn.',
      confirmPasswordDontMatch: 'Mật khẩu xác nhận không khớp!',
    },
    message: {
      success: 'Chúc mừng, tài khoản của bạn đã được tạo thành công.',
      failure: 'Đã xảy ra lỗi. Vui lòng thử lại!',
    },
  },
  login: {
    title: 'Đăng nhập',
    email: 'Email',
    password: 'Mật khẩu',
    forgotPassword: 'Quên mật khẩu?',
    btnSubmit: 'Đăng nhập',
    noAccount: 'Đăng kí tài khoản?',
    signup: 'Đăng kí',
    placeholder: {
      email: 'Nhập email của bạn',
      password: 'Nhập mật khẩu của bạn',
    },
    validation: {
      emailEmpty: 'Vui lòng nhập email của bạn.',
      emailInvalidFormat: 'Định dạng email không hợp lệ.',
      emailExist: 'Email không tồn tại.',
      passwordEmpty: 'Vui lòng nhập mật khẩu của bạn.',
      passwordIncorrect: 'Mật khẩu của bạn không đúng.',
    },
  },
  forgot: {
    title: 'Đặt lại mật khẩu của bạn',
    submitBtn: 'Gửi email cho tôi',
    message: {
      success: 'Chúc mừng, tài khoản của bạn đã được tạo thành công.',
      failure: 'Đã xảy ra lỗi. Vui lòng thử lại!',
    },
  },
};
