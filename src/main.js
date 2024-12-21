import { parsePictureLinks } from './pictureParser.js';
import { isSavingPathGiven, isPicturesAmountChosen, isPicturesAmountPositiveInt, isPictureAmountCorrect } from './validators.js';
import { downloadImages, getArrayOfBigPictures } from './pictureScraper.js';

export async function handleSearch(query) {
  const links = await parsePictureLinks(query);
  return links;
}

export async function handleDownload({ links, pictureName, savePath, picturesAmount, mode }) {
  if (!isSavingPathGiven(savePath)) {
    throw new Error('Не выбран путь сохранения');
  }
  if (!isPicturesAmountChosen(picturesAmount)) {
    throw new Error('Не выбрано число картинок для сохранения');
  }
  if (!isPicturesAmountPositiveInt(picturesAmount)) {
    throw new Error('Число картинок не может быть нулевым');
  }
  if (!isPictureAmountCorrect(picturesAmount, links)) {
    throw new Error(`Число картинок не может превышать ${links.length}`);
  }

  let processedLinks = links;
  if (mode === 'big') {
    processedLinks = getArrayOfBigPictures(links);
  }

  const result = await downloadImages({
    links: processedLinks,
    pictureName,
    savePath,
    totalRequests: picturesAmount
  });

  return result;
}
