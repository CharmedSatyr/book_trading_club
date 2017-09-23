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
        if (!b.author_name) {
          author = 'Unlisted'
        } else if (b.author_name.length === 1) {
          author = b.author_name[0]
        } else if (b.author_name.length === 2) {
          author = b.author_name.join(' and ')
        } else if (b.author_name.length > 2) {
          author = b.author_name[0] + ', ' + b.author_name[1] + ', et al.'
        } else {
          author = 'Unlisted'
        }
        //Validate and Clean Title
        let title
        if (!b.title) {
          title = 'Unlisted Title'
        } else {
          title = b.title
        }

        //Validate and Clean Publication Date
        let publication
        if (!b.first_publish_year) {
          publication = 0
        } else {
          publication = b.first_publish_year
        }

        //Validate and Clean Cover Keys
        let cover
        if (!b.cover_edition_key) {
          cover = null
        } else {
          cover = b.cover_edition_key
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
          title: title,
          publication: publication,
          cover: cover,
          olkey: k
        }

        //Push the book object to the books array
        if (book.cover) {
          books.push(book)
        }

        //Handle short responses
        if (i === response.docs.length - 1) {
          break
        }
      }

      //Send the array to the client
      res.json(books)
    }
  )
}
