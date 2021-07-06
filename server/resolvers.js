const { books } = require("./books");

const resolvers = {
  User: {
    message: (user, args, context) => context.Message.getById(args.id),
  },
  Query: {
    messages: () => [
      { id: 0, content: "Hello!" },
      { id: 1, content: "Bye!" },
    ],
    books: (parent, arg) => {
      return books.slice(arg.offset, arg.offset + arg.limit);
    },
    getBook: (parent, arg) => {
      let findBook = books.find(({ id }) => arg.id == id);
      var allAutorsBook = books
        .filter((obj) => obj.author === findBook.author)
        .map((obj) => {
          return {
            title: obj.title,
          };
        });
      if (allAutorsBook.length !== 1) {
        findBook.autorBookList = allAutorsBook;
      } else {
        findBook.autorBookList = [];
      }

      return findBook;
    },
    currentUser: (parent, args, context) => context.user,
  },
  Mutation: {
    addBook: (parent, arg) => {
      books.push(arg.onebook);
      return arg.onebook;
    },
    deleteBook: (parent, arg) => {
      let someBooks = books.filter((item) => item.id < arg.id);
      books.splice(someBooks.length, 1);
      return "book deleted";
    },
    updateBook: (parent, arg) => {
      console.log(books);
      objIndex = books.findIndex((obj) => obj.id == arg.book.id);
      books[objIndex] = arg.book;
      return books[objIndex];
    },
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED),
    },
  },
};
module.exports = { resolvers };
