'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Material UI
import ActionSwapVerticalCircle from 'material-ui/svg-icons/action/swap-vertical-circle'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'

//App
import RequestsBadge from './RequestsBadge.jsx'
import BookSearch from './BookSearch.jsx'
import Input from './Input.jsx'
import Library from './Library.jsx'
import Profile from './Profile.jsx'
import NavBar from './NavBar.jsx'
import Snack from './Snack.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'
import { librarian } from '../controllers/socket.client.jsx'

/*** MAIN ***/
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addBooks: false,
      allBooks: true,
      bookSearch: [],
      loggedUser: '',
      message: '',
      myBooks: false,
      myRequests: [],
      myShelves: [],
      otherShelves: [],
      profile: false,
      requestedBooks: [],
      requestsForMe: []
    }
    this.searchBooks = this.searchBooks.bind(this)
    this.clearBooks = this.clearBooks.bind(this)
    this.snackApprove = this.snackApprove.bind(this)
    this.snackCancel = this.snackCancel.bind(this)
    this.snackDelete = this.snackDelete.bind(this)
    this.snackDeny = this.snackDeny.bind(this)
    this.snackAdd = this.snackAdd.bind(this)
    this.snackSwap = this.snackSwap.bind(this)
  }
  searchBooks() {
    const query = document.getElementById('search').value
    console.log(query)
    f('POST', '/api/search/' + query, response => {
      console.log('Search response', response)
      this.setState({ bookSearch: response })
    })
  }
  //Snackbar functions have to stay in App so they don't dismount when App's children dismount
  snackAdd() {
    this.setState({ message: 'Adding book to your collection...' })
    setTimeout(() => {
      this.setState({ message: '' })
    }, 3000)
  }
  snackApprove() {
    this.setState({ message: 'Approving swap request...' })
    setTimeout(() => {
      this.setState({ message: '' })
    }, 3000)
  }
  snackCancel() {
    this.setState({ message: 'Canceling swap request...' })
    setTimeout(() => {
      this.setState({ message: '' })
    }, 3000)
  }
  snackDelete() {
    this.setState({ message: 'Removing book from your collection...' })
    setTimeout(() => {
      this.setState({ message: '' })
    }, 3000)
  }
  snackDeny() {
    this.setState({ message: 'Denying swap request...' })
    setTimeout(() => {
      this.setState({ message: '' })
    }, 3000)
  }
  snackSwap() {
    this.setState({ message: 'Requesting swap...\nThis request will appear in Your Books.' })
    setTimeout(() => {
      this.setState({ message: '' })
    }, 3000)
  }
  loggedUser() {
    f('GET', '/api/users/logged', response => {
      this.setState({ loggedUser: response })

      //Call populate shelves fns and checkLibrary with loggedUser as argument
      this.populateMyShelves(response)
      this.populateOtherShelves(response)
      this.checkLibrary(response)
    })
  }
  populateOtherShelves(user) {
    f('GET', '/api/' + user + '/otherBooks', response => {
      this.setState({ otherShelves: response })
    })
  }
  populateMyShelves(user) {
    f('GET', '/api/' + user + '/userBooks', response => {
      this.setState({ myShelves: response })
    })
  }
  /* Keeps personal and full library in sync among devices without refresh
   * using web sockets. Preserves efficiency in state. However, not constantly
   * updating these causes the NavBar not to auto-resize on window resize. */

  checkLibrary(user) {
    librarian(1000, user, result => {
      //myBooks
      if (result[0] && JSON.stringify(this.state.myShelves) !== JSON.stringify(result[0])) {
        this.setState({ myShelves: result[0] })
      }
      //otherBooks
      if (result[1] && JSON.stringify(this.state.otherShelves) !== JSON.stringify(result[1])) {
        this.setState({ otherShelves: result[1] })
      }
      //All requested books
      if (result[2] && JSON.stringify(this.state.requestedBooks) !== JSON.stringify(result[2])) {
        this.setState({ requestedBooks: result[2] })
      }
      //My requests
      if (result[3] && JSON.stringify(this.state.myRequests) !== JSON.stringify(result[3])) {
        this.setState({ myRequests: result[3] })
      }
      //Requests for my books
      if (result[4] && JSON.stringify(this.state.requestsForMe) !== JSON.stringify(result[4])) {
        this.setState({ requestsForMe: result[4] })
      }
    })
  }
  clearBooks() {
    this.setState({ bookSearch: [] })
    document.getElementById('search').value = ''
  }
  //Views
  allbooksfn() {
    this.setState({
      addBooks: false,
      myBooks: false,
      allBooks: true,
      profile: false
    })
  }
  addbooksfn() {
    this.setState({
      addBooks: true,
      myBooks: false,
      allBooks: false,
      profile: false
    })
  }
  mybooksfn() {
    this.setState({
      addBooks: false,
      myBooks: true,
      allBooks: false,
      profile: false
    })
  }
  profilefn() {
    this.setState({
      addBooks: false,
      myBooks: false,
      allBooks: false,
      profile: true
    })
  }
  //Start Up
  componentWillMount() {
    this.loggedUser()
  }
  render() {
    const { loggedUser } = this.state

    //navbar
    const navbar = (
      <NavBar
        loggedUser={loggedUser}
        addbooksfn={() => {
          this.addbooksfn()
        }}
        allbooksfn={() => {
          this.allbooksfn()
        }}
        mybooksfn={() => {
          this.mybooksfn()
        }}
        profilefn={() => {
          this.profilefn()
        }}
      />
    )

    //add books
    const addbooks = (
      <div>
        <Input
          searchBooks={this.searchBooks}
          clearBooks={this.clearBooks}
          visible={this.state.bookSearch.length > 0}
        />
        <br />
        <Divider />
        <BookSearch
          quest={this.state.bookSearch}
          snackAdd={this.snackAdd}
          loggedUser={loggedUser}
        />
      </div>
    )

    return (
      <div>
        {navbar}
        {/* SEARCH */}
        {this.state.addBooks ? addbooks : null}
        {/* ALL BOOKS */}
        {this.state.allBooks ? (
          <div>
            <Subheader>Community Books</Subheader>
            <div className="allBooksHeader">
              <div>
                Click the <ActionSwapVerticalCircle className="ActionSwapVerticalCircle" /> to
                request a trade!
              </div>
              <RequestsBadge
                myRequests={this.state.myRequests.length}
                requestsForMe={this.state.requestsForMe.length}
              />
            </div>
            {this.state.requestedBooks.length ? (
              <span>
                <Divider />
                <Subheader>Requested</Subheader>
                {this.state.requestedBooks.length ? (
                  <Library location={this.state.requestedBooks} loggedUser={loggedUser} />
                ) : (
                  <div>Nobody has requested any books...</div>
                )}
              </span>
            ) : null}
            <Divider />
            {this.state.otherShelves.length ? (
              <span>
                <Subheader>Available to Swap</Subheader>
                <Library
                  location={this.state.otherShelves}
                  loggedUser={loggedUser}
                  requestor={loggedUser}
                  snackSwap={this.snackSwap}
                  whichButton="swap"
                />
              </span>
            ) : (
              <div>Nothing to show here. Every book has been requested!</div>
            )}
          </div>
        ) : null}

        {/*MY BOOKS*/}
        {this.state.myBooks ? (
          <div>
            {/* USER LIBRARY */}
            <Subheader>Your Books</Subheader>
            <RequestsBadge
              myRequests={this.state.myRequests.length}
              requestsForMe={this.state.requestsForMe.length}
            />
            <Divider />
            {/* REQUESTS FOR ME*/}
            {this.state.requestsForMe.length ? (
              <span>
                <Subheader>Someone's Requested These...</Subheader>
                <Library
                  location={this.state.requestsForMe}
                  loggedUser={loggedUser}
                  snackApprove={this.snackApprove}
                  snackDeny={this.snackDeny}
                  whichButton="approveDeny"
                />
                <Divider />
              </span>
            ) : null}
            {/* USER'S REQUESTS */}
            {this.state.myRequests.length ? (
              <span>
                <Divider />
                <Subheader>Books You've Requested</Subheader>
                <Library
                  location={this.state.myRequests}
                  loggedUser={loggedUser}
                  snackCancel={this.snackCancel}
                  whichButton="cancelRequest"
                />
              </span>
            ) : null}
            {/* YOUR BOOKS */}
            <Subheader>Your Books</Subheader>
            {this.state.myShelves.length ? (
              <Library
                location={this.state.myShelves}
                snackDelete={this.snackDelete}
                whichButton="delete"
              />
            ) : (
              <div>Add some books to your collection!</div>
            )}
          </div>
        ) : null}

        {/* PROFILE */}
        {this.state.profile ? <Profile loggedUser={loggedUser} /> : null}
        <Snack message={this.state.message} />
      </div>
    )
  }
}
