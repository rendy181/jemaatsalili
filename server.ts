import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Enable JSON parsing with 50MB limit to support uploaded base64 photos
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE_PATH = path.join(DATA_DIR, 'church-data.json');

// Ensure data folder and file exists
function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE_PATH)) {
    console.log('[Server] Initializing church-data.json...');
    // Seed default file
    const defaultData = {
      profile: {
        name: 'GMAHK Jemaat Salili Siau Tengah',
        denomination: 'Gereja Masehi Advent Hari Ketujuh',
        tagline: 'Mewartakan Kasih Karunia & Pengharapan Kedatangan Yesus yang Segera di Kepulauan Sitaro',
        shortDescription: 'Selamat datang di persekutuan jemaat GMAHK Salili...',
      },
    };
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

function readChurchData() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Server] Error reading church-data.json:', err);
    return null;
  }
}

function writeChurchData(data: any) {
  ensureDataFile();
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[Server] Error writing to church-data.json:', err);
    return false;
  }
}

// ================= API ENDPOINTS =================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// GET all church data from file
app.get('/api/church-data', (req, res) => {
  const data = readChurchData();
  if (!data) {
    return res.status(500).json({ error: 'Gagal membaca data website dari file server' });
  }
  res.json(data);
});

// POST save entire or specific section of church data to file
app.post('/api/church-data', (req, res) => {
  try {
    const currentData = readChurchData() || {};
    const payload = req.body;

    // Merge or replace
    const updatedData = {
      ...currentData,
      ...payload,
      _lastUpdated: new Date().toISOString(),
    };

    const success = writeChurchData(updatedData);
    if (!success) {
      return res.status(500).json({ error: 'Gagal menulis data ke file data/church-data.json' });
    }

    res.json({
      success: true,
      message: 'Data berhasil disimpan secara permanen ke file website (data/church-data.json)',
      lastUpdated: updatedData._lastUpdated,
      data: updatedData,
    });
  } catch (error: any) {
    console.error('[Server] Save error:', error);
    res.status(500).json({ error: error.message || 'Internal server error saat menyimpan data' });
  }
});

// POST save a specific section (e.g. articles, schedules, leaders, etc.)
app.post('/api/church-data/section', (req, res) => {
  try {
    const { section, data } = req.body;
    if (!section) {
      return res.status(400).json({ error: 'Section key harus ditentukan' });
    }

    const currentData = readChurchData() || {};
    currentData[section] = data;
    currentData._lastUpdated = new Date().toISOString();

    const success = writeChurchData(currentData);
    if (!success) {
      return res.status(500).json({ error: `Gagal menyimpan section ${section} ke file` });
    }

    res.json({
      success: true,
      message: `Bagian "${section}" berhasil disimpan permanen ke file data/church-data.json`,
      section,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ================= VITE / STATIC SERVING =================
async function startServer() {
  ensureDataFile();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] GMAHK Salili Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
