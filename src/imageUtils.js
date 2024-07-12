import characters from './data/characters.json'

const createObject = (entry, acc = {}) => {
  acc[entry] = getPath(entry); 
  return acc
}
const getPath = (entry) => `assets/cards/${entry}.png`



export const characters = characters
