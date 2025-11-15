const fs = require('fs');
const path = require('path');

/**
 * Belirtilen log dosyasına zaman damgalı içerik ekler.
 * @param {string} filename - logs klasöründeki dosya adı (örnek: 'success.log')
 * @param {string} content - loga yazılacak metin
 */
function logToFile(filename, content) {
  const logDir = path.join(__dirname, '..', 'logs');
  const filePath = path.join(logDir, filename);

  // logs klasörü yoksa oluştur
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${content}\n`;

  fs.appendFile(filePath, logEntry, err => {
    if (err) console.error(`❌ Log yazılamadı: ${err.message}`);
  });
}

module.exports = { logToFile };