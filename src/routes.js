/* eslint linebreak-style: ["error", "windows"] */

// eslint-disable-next-line max-len
const {addNewBooks, showAllBooks, showBooksId, updateBooks, deleteBooks} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addNewBooks,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/books',
    handler: showAllBooks,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: showBooksId,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBooks,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBooks,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
];

module.exports = routes;
