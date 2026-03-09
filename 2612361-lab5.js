const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Your routes here

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
let books = [];
const studentNum = "2612361";
const book = {
    "id": "1",
    "title": "To Kill a Mockingbird",
    "details": [
        {
            "id": "1",
            "author": "Harper Lee",
            "genre": "Fiction",
            "publicationYear": 1960
        }
    ]
}

app.get("/whoami", (req,res)=>{
    res.status(200).json({studentNum});
});

app.get("/books",(req,res)=>{
    res.status(200).json(books);
});

app.get("/books/:id", (req,res)=>{
    const book = books.find(b => b.id === req.params.id);
    if(!book){
        return res.status(404).json({ error: "Book not found"});
    }
    res.status(200).json(book);
});

app.post("/books", (req,res) => {
    const { title } = req.body;
    if(!title){
        return res.status(404).json({error:"Missing requiered fields"});
    }
    const newBook = {
        id: String(books.length + 1),
        title,
        details: []
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put("/books/:id", (req,res)=>{
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({error: "Book not found"});
    }
    const {title} = req.body
    if(title){
        book.title = title;
    }
    res.status(200).json(book);
});

app.delete("/books/:id", (req,res) =>{
    const index=books.findIndex(b => b.id === req.params.id);
    if(index===-1){
        return res.status(404).json({error: "Book not found"});
    }
    books.splice(index,1);
    res.status(204).send();
});

app.post("/books/:id/details", (req,res) => {
    const book = books.find(b => b.id === req.params.id);
    if(!book){
        return res.status(404).json({error:"Book not found"});
    }
    const{author, genre, publicationYear} = req.body;
    const newDetail = {
        id: String(books.details.length + 1),
        author,
        genre,
        publicationYear
    };
    books.details.push(newDetail);
    res.status(201).json(newDetail);
});

app.delete("/books/:id/details/:detailId", (req,res) =>{
    const book = books.find(b=>b.id === req.params.id);
    if(!book){
        return res.status(404).json({error:"Book or detail not found"});
    }
    const index = book.details.findIndex(d => d.id === req.params.id);
    if(index===-1){
        return res.status(404).json({error: "Book or detail not found"});
    }
    books.splice(index,1);
    res.status(204).send();
});