/* eslint linebreak-style: ["error", "windows"] */
const {nanoid} = require('nanoid');
const books = require('./books');

const addNewBooks = (request, h) => {
  const {name, year, author, summary,
    publisher, pageCount, readPage, reading} = request.payload;
  const bookId = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;
  const book = {bookId, name, year, author, summary, publisher,
    pageCount, readPage, reading, insertedAt, updatedAt, finished};

  const isNameExist = name !== undefined;
  const isReadPageValid = readPage <= pageCount;

  if (!isNameExist) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (!isReadPageValid) {
    const response = h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(book);
  const isSuccess = books.filter((b) => b.bookId === bookId).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: book.bookId,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const showAllBooks = (request, h) => {
  const {name, reading, finished} = request.query;
  const note = [];
  books.forEach((b) => {
    valid = true;
    if (name != undefined) {
      if (!b.name.toLowerCase().includes(name.toLowerCase())) {
        valid = false;
      }
    };
    if (reading == 0 || reading == 1) {
      // eslint-disable-next-line max-len
      if ((b.reading == false && reading == 1) || (b.reading == true && reading == 0)) {
        valid = false;
      }
    };
    if (finished == 0 || finished == 1) {
      // eslint-disable-next-line max-len
      if ((b.finished == false && finished == 1) || (b.finished == true && finished == 0)) {
        valid = false;
      }
    }
    if (valid) {
      note.push({
        id: b.bookId,
        name: b.name,
        publisher: b.publisher,
      });
    }
  });
  const response = h.response({
    status: 'success',
    data: {
      books: note,
    },
  });
  response.code(200);
  return response;
};

const showBooksId = (request, h) => {
  const {bookId} = request.params;
  const index = books.findIndex((b) => b.bookId === bookId);

  if (index !== -1) {
    booktemp = {
      id: books[index].bookId,
      name: books[index].name,
      publisher: books[index].publisher,
      year: books[index].year,
      author: books[index].author,
      summary: books[index].summary,
      pageCount: books[index].pageCount,
      readPage: books[index].readPage,
      reading: books[index].reading,
      insertedAt: books[index].insertedAt,
      updatedAt: books[index].updatedAt,
      finished: books[index].finished,
    };
    const response = h.response({
      status: 'success',
      data: {
        book: booktemp,
      },
    });
    response.code(200);
    return response;
  };

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const updateBooks = (request, h) => {
  const {bookId} = request.params;
  const {name, year, author, summary,
    publisher, pageCount, readPage, reading} = request.payload;
  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  const isNameExist = name !== undefined;
  const isReadPageValid = readPage <= pageCount;

  if (!isNameExist) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (!isReadPageValid) {
    const response = h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((b) => b.bookId === bookId);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
      finished,
    };
    booktemp = books[index];
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
      data: {
        book: booktemp,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBooks = (request, h) => {
  const {bookId} = request.params;
  const index = books.findIndex((b) => b.bookId === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// eslint-disable-next-line max-len
module.exports = {addNewBooks, showAllBooks, showBooksId, updateBooks, deleteBooks};
