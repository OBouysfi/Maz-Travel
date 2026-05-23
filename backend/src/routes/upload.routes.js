const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename });
});

module.exports = router;
