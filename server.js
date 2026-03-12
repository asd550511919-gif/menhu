const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, '/'))); // Serve static files from root

// Storage configuration for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ensure images directory exists
        const dir = 'images/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        // Use original name but prevent overwriting by prepending timestamp if needed?
        // For simplicity, we use original name as requested, but maybe add timestamp to avoid cache issues
        // User request implies specific naming, so let's stick to originalname for now.
        // Or better: use timestamp-originalname to be safe.
        // But user said "xipu1.png", so they might want clean names.
        // Let's use Buffer.from(file.originalname, 'latin1').toString('utf8') to handle chinese characters if any,
        // though standard practice is avoid non-ascii in filenames.
        // Given the environment is windows, let's just use originalname.
        cb(null, file.originalname) 
    }
});
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 18 * 1024 * 1024, // 18MB limit per file
        fieldSize: 18 * 1024 * 1024 // 18MB limit for text fields
    }
});

// Load works data
const worksFilePath = path.join(__dirname, 'data', 'works.json');

// Helper to read/write JSON
const getWorks = () => {
    if (!fs.existsSync(worksFilePath)) return [];
    return JSON.parse(fs.readFileSync(worksFilePath, 'utf8'));
};
const saveWorks = (works) => {
    fs.writeFileSync(worksFilePath, JSON.stringify(works, null, 2), 'utf8');
};

// API: Get all works
app.get('/api/works', (req, res) => {
    const works = getWorks();
    const brand = req.query.brand;
    const category = req.query.category;
    
    let result = works;
    
    if (brand) {
        result = result.filter(w => w.brand === brand);
    }
    
    if (category) {
        result = result.filter(w => w.category === category);
    }
    
    res.json(result);
});

// API: Get single work
app.get('/api/works/:id', (req, res) => {
    const works = getWorks();
    const work = works.find(w => w.id === req.params.id);
    if (work) res.json(work);
    else res.status(404).json({ message: 'Work not found' });
});

// API: Upload and Create new work
// Expects 'ticket' and 'details' fields in form-data
app.post('/api/works', (req, res, next) => {
    upload.fields([{ name: 'ticket', maxCount: 1 }, { name: 'details', maxCount: 50 }])(req, res, function (err) {
        if (err) {
            console.error('Upload Error:', err);
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, (req, res) => {
    try {
        const works = getWorks();
        const files = req.files;
        const body = req.body;

        const newWork = {
            id: 'work' + (Date.now()), // Simple ID generation
            title: body.title || 'Untitled',
            brand: body.brand || 'mirada', // Default to mirada if not specified
            category: body.category || 'work', // Default to work
            ticketImage: files['ticket'] ? 'images/' + files['ticket'][0].filename : '',
            detailImages: files['details'] ? files['details'].map(f => 'images/' + f.filename) : []
        };

        // If ticketImage is missing, maybe use a default? Or reject?
        // For now, allow partial uploads.

        works.push(newWork);
        saveWorks(works);
        res.json(newWork);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// API: Update existing work
app.put('/api/works/:id', (req, res, next) => {
    upload.fields([{ name: 'ticket', maxCount: 1 }, { name: 'newDetails', maxCount: 50 }])(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.error('Multer Error:', err);
            return res.status(400).json({ error: `Upload error: ${err.message}` });
        } else if (err) {
            // An unknown error occurred when uploading.
            console.error('Unknown Upload Error:', err);
            return res.status(500).json({ error: `Unknown error: ${err.message}` });
        }
        
        // Everything went fine.
        next();
    });
}, (req, res) => {
    try {
        let works = getWorks();
        const workIndex = works.findIndex(w => w.id === req.params.id);
        
        if (workIndex === -1) {
            return res.status(404).json({ message: 'Work not found' });
        }

        const files = req.files;
        const body = req.body;
        const work = works[workIndex];

        // Update basic info
        if (body.title) work.title = body.title;
        if (body.brand) work.brand = body.brand;
        if (body.category) work.category = body.category;

        // 1. Handle Ticket
        if (files['ticket'] && files['ticket'].length > 0) {
            work.ticketImage = 'images/' + files['ticket'][0].filename;
        } else if (body.deleteTicket === 'true') {
            work.ticketImage = '';
        }

        // 2. Handle Detail Images
        // detailStructure is a JSON string: ["images/old1.png", "NEW_FILE", "images/old2.png", "NEW_FILE"]
        if (body.detailStructure) {
            const structure = JSON.parse(body.detailStructure);
            const newFiles = files['newDetails'] || [];
            const newDetailImages = [];
            
            let fileIndex = 0;
            for (const item of structure) {
                if (item === 'NEW_FILE_PLACEHOLDER') {
                    if (fileIndex < newFiles.length) {
                        newDetailImages.push('images/' + newFiles[fileIndex].filename);
                        fileIndex++;
                    }
                } else {
                    // It's an existing path (simple security check: must start with images/)
                    if (item.startsWith('images/')) {
                        newDetailImages.push(item);
                    }
                }
            }
            work.detailImages = newDetailImages;
        }

        works[workIndex] = work;
        saveWorks(works);
        res.json(work);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// API: Delete work
app.delete('/api/works/:id', (req, res) => {
    let works = getWorks();
    const initialLength = works.length;
    works = works.filter(w => w.id !== req.params.id);
    if (works.length < initialLength) {
        saveWorks(works);
        res.json({ message: 'Deleted successfully' });
    } else {
        res.status(404).json({ message: 'Work not found' });
    }
});

// API: Login (Mock)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Simple hardcoded check
    if (username === 'admin' && password === 'admin') {
        res.json({ token: 'mock-token-123' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
