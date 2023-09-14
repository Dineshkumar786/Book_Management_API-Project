// Book Management System using node js and Express Js

const express = require("express");
var bodyParser = require("body-parser");


// Database
const database = require("./database");

// Initialize  express
const booky = express();
booky.use(express.json());

// for POST
booky.use(bodyParser.urlencoded({ extended: true }));
booky.use(bodyParser.json());


// Created First API
/*
Route                /
Description          Get all the books
Access               PUBLIC
Parameter            None
Methods              GET
*/


booky.get("/", (req, res) => {
	return res.json({ books: database.Books });
});

/*
Route                /is
Description          to get a specific book
Access               PUBLIC
Parameter            isbn
Methods              GET
*/


booky.get("/is/:isbn", (req, res) => {
	const getSpecificBook = database.Books.filter(
		(book) => book.ISBN === req.params.isbn
	);

	if (getSpecificBook.length === 0) {
		return res.json({ error: `No book found for the ISBN of ${req.params.isbn}` });
	}
	return res.json({ book: getSpecificBook });
});



/*
Route                /c
Description          to get a specific book based on category.
Access               PUBLIC
Parameter            catg
Methods              GET
*/


booky.get("/c/:catg", (req, res) => {
	const getSpecificBooks = database.Books.filter(
		(Book) => Book.Category.includes(req.params.catg)
	)

	if (getSpecificBooks.length === 0) {
		return res.json({ error: 'No book found  for the category  of ${req.params.catg}' })
	}
	return res.json({ books: getSpecificBooks });
});


/*
Route                /l
Description          to get a list of books based on languages.
Access               PUBLIC
Parameter            lang
Methods              GET
*/


booky.get("/l/:lang", (req, res) => {
	const getLanguageOfBook = database.Books.filter(
		(Book) => Book.Language === req.params.lang
	)

	if (getLanguageOfBook.length === 0) {
		return res.json({ error: 'No list of books found based on language ${req.params.lang}' })
	}
	return res.json({ books: getLanguageOfBook });
});


/*
Route                /author
Description          to get  all the authors
Access               PUBLIC
Parameter            None
Methods              GET
*/


booky.get("/author", (req, res) => {
	return res.json({ authors: database.author });
});

// Post - 
/*
Route                /authors/new
Description          to add new authors
Access               PUBLIC
Parameter            name
Methods              POST
*/

booky.post("/authors/new", (req, res) => {
	const newAuthors = req.body;
	database.author.push(newAuthors);
	return res.json({ newAuthors: database.author });
});



/*
Route                /authors
Description          to get a specific authors
Access               PUBLIC
Parameter            name
Methods              GET
*/

booky.get("/author/:name", (req, res) => {
	const getSpecificAuthorBook = database.author.filter(
		(authors) => authors.name.includes(req.params.name)
	);

	if (getSpecificAuthorBook.length === 0) {
		return res.json({ error: 'No book found  for the category  of ${req.params.name}' });
	}
	return res.json({ authors: getSpecificAuthorBook })
});


/*
Route                /authors/books
Description          to get a specific authors based on books
Access               PUBLIC
Parameter            isbn
Methods              GET
*/

booky.get("/authors/books/:isbn", (req, res) => {
	const getSpecificAuthorBasedOnID = database.author.filter(
		(authors) => authors.Books.includes(req.params.isbn)
	);
	if (getSpecificAuthorBasedOnID === 0) {
		return res.json({ error: 'no author found for the book of ${req.params.isbn}' });
	}
	return res.json({ authors: getSpecificAuthorBasedOnID })
})

/*
Route                /authors/books
Description          to get a specific authors based on id
Access               PUBLIC
Parameter            isbn
Methods              GET
*/

booky.get("/authors/:id", (req, res) => {
	const authorId = database.author.filter(
		(authors) => authors.id.includes(req.params.id)
	)

	if (authorId) {
		res.json(authorId);
	} else {
		res.status(404).json({ error: "Author not found" });
	}
});


/*
Route                /publications
Description          to get all the publications
Access               PUBLIC
Parameter            None
Methods              GET
*/

booky.get("/publications", (req, res) => {
	return res.json({ publications: database.Publications })
});


// Post
/*
Route                /book/new
Description          / to add new books
Access               PUBLIC
Parameter            none
Methods              POST
*/

booky.post("/book/new", (req, res) => {
	const newBook = req.body;
	database.Books.push(newBook);
	return res.json({ updatedBooks: database.Books });

});


/*
	Route                /publication/new
	Description          to add new publications
	Access               PUBLIC
	Parameter            NONE
	Methods              POST
	*/

booky.post("/publication/new", (req, res) => {
	const newPublication = req.body;
	database.Publications.push(newPublication);
	return res.json({ newPublications: database.Publications });
});




// PUT
/*
	Route               /publication/update/book
	Description          update or add new publications
	Access               PUBLIC
	Parameter            isbn
	Methods              PUT
	*/


booky.put("/publication/update/book/:isbn", (req, res) => {
	// update the publication database
	database.Publications.forEach((pub) => {
		if (pub.ID === req.body.pubId) {
			return pub.Books.push(req.params.isbn);
		}

	});

	// update the book database 
	database.Books.forEach((book) => {
		if (book.ISBN === req.params.isbn) {
			book.publications = req.body.pubId;
			return;
		}


	});

	return res.json(
		{
			books: database.Books,
			publications: database.Publications,
			message: "successfully  updated publications"

		}
	);
});


// DELETE

/*
Route                /book/delete/
Description          to delete a book
Access               PUBLIC
Parameter            isbn
Methods              DELETE
*/

booky.delete("/book/delete/:isbn", (req, res) => {
	// whichever book that doesnot match with isbn , just send it to and updatedBookDatabase array
	// and rest will be filtered out 

	const updatedBookDatabase = database.Books.filter(
		(book) => book.ISBN != req.params.isbn
	)
	database.Books = updatedBookDatabase;
	return res.json({ books: database.Books })
})

/*
Route                /book/delete/author/
Description          to delete a author from book and related book from author
Access               PUBLIC
Parameter            isbn/authorId
Methods              DELETE
*/



booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
	// update the book database
	database.Books.forEach((book) => {
		if (book.ISBN === req.params.isbn) {
			const newAuthorList = book.Author.filter(
				(eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
			);
			book.Author = newAuthorList
			return;
		}
	});

	// update the author database
	database.author.forEach((eachAuthor) =>{
		if(eachAuthor.id === parseInt(req.params.authorId)){
			const newBookList =eachAuthor.Books.filter(
				(book) => book!== req.params.isbn
			);
			eachAuthor.Books = newBookList;
			return;
		}
	});
	return res.json({
		book:database.Books,
		author :database.author,
		message :"all author was deleted "

	});
})




/*
Route                /publications
Description          to get a specific publications based on name
Access               PUBLIC
Parameter            name
Methods              GET
*/


booky.get("/publications/:name", (req, res) => {
	const getSpecificName = database.Publications.filter(
		(pubcl) => pubcl.name.includes(req.params.name)
	);
	if (getSpecificName === 0) {
		return res.json({ error: 'no publication found  ${req.params.name}' });
	}
	return res.json({ publications: getSpecificName })
});


/*
Route                /publications/books
Description          to get a specific publications based on book
Access               PUBLIC
Parameter            isbn
Methods              GET
*/


booky.get("/publications/books/:isbn", (req, res) => {
	const getSpecificPubc_Books = database.Publications.filter(
		(specificBook) => specificBook.Books.includes(req.params.isbn)
	);
	if (getSpecificPubc_Books === 0) {
		return res.json({ error: 'no publications found for the book of ${req.params.isbn}' });
	}
	return res.json({ authors: getSpecificPubc_Books })
})



booky.listen(3000, () => {
	console.log("Server is up and running");
});

