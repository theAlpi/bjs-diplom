const logoutButton = new logoutButton(); 
logoutButton.action = () => ApiConnector.logout(() => location.reload()); // Выход

// Получение данных текущего пользователя
ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

// Получение текущих курсов валюты
const ratesBoard = new ratesBoard();
ApiConnector.getStocks((response) => {
  if (response.success) {
    ratesBoard.fillTable(response.data);
    setInterval(() => {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }, 60000);
  }
});

// Операции с деньгами
// Пополнение баланса
const moneyManager = new moneyManager();
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Баланс пополнен");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};
// Конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Сделка прошла успешно");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};
// Перевод валюты
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Выполнен перевод валюты");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};
// Работа с избранным
// Запрос начального списка избранного
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});
// Добавление пользователя в список избранного
favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      moneyManager.setMessage(true, "Пользователь добавлен");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};
// Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      moneyManager.setMessage(true, "Пользователь удален");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};