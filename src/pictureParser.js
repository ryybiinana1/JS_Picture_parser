import fetch from 'node-fetch'; //для HTTP-запросов
import { load } from 'cheerio'; // для анализа HTML
import { URL, PHOTO_CONTAINER, PHOTO_CLASS } from './settings.js'; //настройки для поиска картинок.

export async function parsePictureLinks(searchWord) {
  const response = await fetch(URL + encodeURIComponent(searchWord));
  const html = await response.text();
  const $ = load(html); // Используем функцию load вместо импортирования cheerio по умолчанию
  const box = $(PHOTO_CONTAINER + '.' + PHOTO_CLASS);
  const links = new Set();
  box.each((i, el) => {
    const imgTag = $(el).find('img');
    const srcValue = imgTag.attr('src');
    if (srcValue) {
      links.add('https:' + srcValue);
    }
  });
  return Array.from(links);
}
