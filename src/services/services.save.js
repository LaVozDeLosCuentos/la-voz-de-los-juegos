const STORAGE_KEY = 'commons';

class SaveService {
  static saveCurrency(amount) {
    localStorage.setItem(`${STORAGE_KEY}::currency`, amount);
  }

  static loadCurrency() {
    const amount = localStorage.getItem(`${STORAGE_KEY}::currency`);
    return amount ? parseInt(amount, 10) : 0;
  }

  static saveGameData(gameKey, gameData) {
    const saveData = this._getAllGameData();
    saveData[gameKey] = gameData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
  }

  static loadGameData(gameKey) {
    const saveData = this._getAllGameData();
    return saveData[gameKey] || {};
  }

  static _getAllGameData() {
    const saveDataString = localStorage.getItem(STORAGE_KEY);
    return saveDataString ? JSON.parse(saveDataString) : {};
  }
}

export default SaveService;
