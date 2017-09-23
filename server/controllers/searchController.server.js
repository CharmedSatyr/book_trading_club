import { f } from '../../common/common.functions.js'

export const searchSubmit = (req, res) => {
  f(
    'GET',
    'https://openlibrary.org/search.json?q=' + req.params.s,
    response => {
      const books = []

      for (let i = 0; i < 20; i++) {
        const b = response.docs[i]

        const book = {
          author: b.author_name,
          title: b.title,
          publication: b.first_publish_year,
          cover: b.cover_edition_key,
          tag: b.key
        }
        if (book.cover) {
          books.push(book)
        }
      }
      res.json(books)
    }
  )
}
