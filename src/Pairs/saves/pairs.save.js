const STORAGE_KEY = 'pairs';

class PairsSave {
  static saveLevel(level) {
    localStorage.setItem(`${STORAGE_KEY}::level`, `${level}`);
  }

  static loadLevel() {
    const level = localStorage.getItem(`${STORAGE_KEY}::level`);
    return level ? parseInt(level) : 1;
  }
}

export default PairsSave;
