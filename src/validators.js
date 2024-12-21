export function isSavingPathGiven(path) {
    return Boolean(path);
  }
  
  export function isPicturesAmountChosen(picturesAmount) {
    return Boolean(picturesAmount);
  }
  
  export function isPicturesAmountPositiveInt(picturesAmount) {
    return picturesAmount > 0;
  }
  
  export function isPictureAmountCorrect(picturesAmount, linksArray) {
    return picturesAmount <= linksArray.length;
  }
  