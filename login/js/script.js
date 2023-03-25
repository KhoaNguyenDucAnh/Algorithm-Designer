const url = "https://1f9dd58e-88c5-46df-854d-280aa21a799b.mock.pstmn.io/api/v1/accounts/login";
var form = document.querySelector(".form");

function handleLogin(event) {
  event.preventDefault();
  const data = {
    username: form.email.value,
    password: form.password.value
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(function(response) {
    if (!response.ok) {
      alert("Invalid Credentials");
      throw new Error("Invalid Credentials");
    }
    return response.json();
  })
  .then(function(data) {
      console.log(data);
      sessionStorage.setItem("username", data.username);
      window.location.href = "account.html";
  });
}

form.addEventListener("submit", handleLogin);

function Validator(options) {
  function getParent(element, selector) {
      while (element.parentElement) {
          if (element.parentElement.matches(selector)) {
              return element.parentElement;
          }
          element = element.parentElement;
      }
  }

  var selectorRules = {};

  // Hàm thực hiện validate
  function validate(inputElement, rule) {
      var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
      var errorMessage;

      // Lấy ra các rules của selector
      var rules = selectorRules[rule.selector];
      
      // Lặp qua từng rule & kiểm tra
      // Nếu có lỗi thì dừng việc kiểm
      for (var i = 0; i < rules.length; ++i) {
          switch (inputElement.type) {
              case 'radio':
              case 'checkbox':
                  errorMessage = rules[i](
                      formElement.querySelector(rule.selector + ':checked')
                  );
                  break;
              default:
                  errorMessage = rules[i](inputElement.value);
          }
          if (errorMessage) break;
      }
      
      if (errorMessage) {
          errorElement.innerText = errorMessage;
          getParent(inputElement, options.formGroupSelector).classList.add('invalid');
      } else {
          errorElement.innerText = '';
          getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
      }

      return !errorMessage;
  }

  // Lấy element của form cần validate
  var formElement = document.querySelector(options.form);
  if (formElement) {
      // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
      options.rules.forEach(function (rule) {

          // Lưu lại các rules cho mỗi input
          if (Array.isArray(selectorRules[rule.selector])) {
              selectorRules[rule.selector].push(rule.test);
          } else {
              selectorRules[rule.selector] = [rule.test];
          }

          var inputElements = formElement.querySelectorAll(rule.selector);

          Array.from(inputElements).forEach(function (inputElement) {
             // Xử lý trường hợp blur khỏi input
              inputElement.onblur = function () {
                  validate(inputElement, rule);
              }

              // Xử lý mỗi khi người dùng nhập vào input
              inputElement.oninput = function () {
                  var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                  errorElement.innerText = '';
                  getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
              } 
          });
      });
  }

}

Validator.isRequired = function (selector, message) {
  return {
      selector: selector,
      test: function (value) {
          return value ? undefined :  message || 'Vui lòng nhập'
      }
  };
}

Validator.isEmail = function (selector, message) {
  return {
      selector: selector,
      test: function (value) {
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return regex.test(value) ? undefined :  message || 'Vui lòng nhập đúng định dạng email';
      }
  };
}

Validator.minLength = function (selector, min, message) {
  return {
      selector: selector,
      test: function (value) {
          return value.length >= min ? undefined :  message || `Vui lòng nhập tối thiểu ${min} kí tự`;
      }
  };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
      selector: selector,
      test: function (value) {
          return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
      }
  }
}
