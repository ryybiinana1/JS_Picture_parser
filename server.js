import express from 'express';
import path from 'path'; 
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { handleSearch, handleDownload } from './src/main.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/api/search', async (req, res) => {
  const { query } = req.body;
  try {
    const links = await handleSearch(query);
    res.json({ success: true, links });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
});

app.post('/api/download', async (req, res) => {
  const { links, pictureName, savePath, picturesAmount, mode } = req.body;
  try {
    const result = await handleDownload({ links, pictureName, savePath, picturesAmount, mode });
    res.json({ success: true, message: 'Скачивание завершено', result });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
