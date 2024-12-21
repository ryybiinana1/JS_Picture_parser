import fetch from 'node-fetch';//для HTTP-запросов
import fs from 'fs'; //для операций с файловой системой.
import path from 'path'; //для построения путей

export async function downloadImages({ links, pictureName, savePath, totalRequests }) {
  if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath, { recursive: true });
  }

  let completedRequests = 0;
  const selectedLinks = links.slice(0, totalRequests); //количество ссылок для загрузки

  const tasks = selectedLinks.map(async (link, index) => {
    try {
      const response = await fetch(link);
      if (response.ok) {
        const imageData = await response.buffer();
        const picFile = `${pictureName}${index}`;
        const filePath = path.join(savePath, `${picFile}.jpg`);
        fs.writeFileSync(filePath, imageData);
      } else {
        console.error(`Ошибка: статус ${response.status} для ссылки ${link}`);
      }
    } catch (err) {
      console.error(`Ошибка при загрузке ${link}:`, err);
    }
    completedRequests++;
    return completedRequests;
  });

  await Promise.all(tasks);
  return { completedRequests, totalRequests };
}

export function getArrayOfBigPictures(links) {
  return links.map(link => {
    if (link.includes('_n.jpg')) {
      return link.replace('_n.jpg', '_b.jpg');
    } else if (link.includes('_m.jpg')) {
      return link.replace('_m.jpg', '_b.jpg');
    }
    return link;
  });
}
