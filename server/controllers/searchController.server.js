import { f } from '../../common/common.functions.js'

export const searchSubmit = (req, res) => {
  f(
    'GET',
    'https://openlibrary.org/search.json?q=' + req.params.s,
    response => {
      const books = []

      //Only sort through the first 20 responses
      for (let i = 0; i < 20; i++) {
        const b = response.docs[i]

        //Validate and Clean Author Entries
        let author
        if (b.author_name.length === 1) {
          author = b.author_name[0]
        } else if (b.author_name.length === 2) {
          author = b.author_name.join(' and ')
        } else if (b.author_name.length > 2) {
          author = b.author_name[0] + ', ' + b.author_name[1] + ', et al.'
        } else {
          author = 'Unlisted'
        }

        //Validate and Clean Cover Keys
        let cover
        if (b.cover_edition_key) {
          cover = b.cover_edition_key
        } else {
          cover = null //'No cover image available'
        }

        //Validate and Clean olkeys
        let k
        if (b.key) {
          k = b.key
          k = k.split('')
          k.splice(0, 7)
          k = k.join('')
        }

        //Assemble the book object
        const book = {
          author: author,
          title: b.title,
          publication: b.first_publish_year,
          cover: cover,
          olkey: k
        }

        //Push the book object to the books array
        if (book.cover) {
          books.push(book)
        }
      }

      //Send the array to the client
      res.json(books)
    }
  )
}
