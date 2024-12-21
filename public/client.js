// Добавляем обработчик для кнопки выбора пути
document.getElementById('savePathBtn').addEventListener('click', () => {
    const savePath = prompt('Введите путь для сохранения файлов:');
    if (savePath) {
      document.getElementById('savePath').value = savePath;
    }
  });
  
  document.getElementById('searchBtn').addEventListener('click', async () => {
    const query = document.getElementById('searchQuery').value.trim();
    if (!query) return;
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    if (data.success) {
      window.foundLinks = data.links;
      document.getElementById('foundCount').textContent = data.links.length;
      document.getElementById('status').textContent = 'Ссылки получены';
    } else {
      document.getElementById('status').textContent = 'Ошибка при поиске';
    }
  });
  
  document.getElementById('downloadBtn').addEventListener('click', async () => {
    const links = window.foundLinks || [];
    const savePath = document.getElementById('savePath').value.trim();
    const picturesAmount = parseInt(document.getElementById('picturesAmount').value, 10);
    const pictureName = document.getElementById('pictureName').value.trim() || 'image';
    const mode = document.querySelector('input[name="sizeMode"]:checked').value;
  
    if (!savePath) {
      document.getElementById('status').textContent = 'Укажите путь для сохранения файлов!';
      return;
    }
  
    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ links, savePath, picturesAmount, pictureName, mode })
    });
    const data = await res.json();
    if (data.success) {
      document.getElementById('status').textContent = 'Картинки успешно сохранены';
      window.foundLinks = [];
      document.getElementById('foundCount').textContent = '0';
    } else {
      document.getElementById('status').textContent = data.error || 'Ошибка при скачивании';
    }
  });
  