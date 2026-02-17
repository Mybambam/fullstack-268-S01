// Description: Node Express REST API with Mongoose and MongoDB CRUD Book
const express = require('express'); 
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// --- 1. Connection ---
mongoose.connect('mongodb://admin:TFNcra39139@node85497-fs-ine-napat.proen.app.ruk-com.cloud:11722', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// --- 2. Model Definition ---
const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    published_year: Number
});

const Book = mongoose.model('Book', BookSchema);

// --- 3. Routes (CRUD) ---

// Get all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a book by id
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send('Book not found');
        res.json(book);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Create a new book
app.post('/books', async (req, res) => {
    try {
        const book = new Book(req.body);
        const savedBook = await book.save();
        res.status(201).send(savedBook);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a book
app.put('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).send('Book not found');
        res.send(book);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).send('Book not found');
        res.send({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
});

const port = 5000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));