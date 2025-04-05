'use strict';


const userForm = new UserForm(); // Новый экземпляр для присваивания новому запросу

userForm.loginFormCallback = (data) => { //вызывается при попытке авторизации
  ApiConnector.login(data, response => {  //отправляем запрос на сервер
    if(!response.success){ //проверяет свойство success. Успешна авторизация или нет.
      userForm.setLoginErrorMessage(response.error) // Не успешна. выкидывается ошибку
    }
    else{
      location.reload() //успешна. обновляет страницу. отображается личный кабинет
    }
  }) 
}

userForm.registerFormCallback = (data) => {  
  ApiConnector.register(data, response => {
    if(response.success) {//проверяет свойство success. Успешна регистрация или нет.
      location.reload() //успешна. обновляет страницу. отображается личный кабинет
    }
    else{
      userForm.setRegisterErrorMessage(response.error) // Не успешна. выкидывается ошибку
    }  
  })
}