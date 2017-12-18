'use strict'

/*** ENVIRONMENT ***/
import dotenv from 'dotenv'
dotenv.load()

/*** DEVELOPMENT TOOLS ***/
const DEV = process.env.NODE_ENV === 'development'
const PROD = process.env.NODE_ENV === 'production'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Material UI
import ActionSwapVerticalCircle from 'material-ui/svg-icons/action/swap-vertical-circle'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'

//App
import AddBooks from './AddBooks.jsx'
import Community from './Community.jsx'
import Dashboard from './Dashboard.jsx'
import NavBar from './NavBar.jsx'
import Profile from './Profile.jsx'
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
      loggedLocation: '',
      loggedUser: '',
      message: '',
      otherShelves: [],
      profile: false,
      requestedBooks: [],
      requestsForYou: [],
      yourBooks: false,
      yourRequests: [],
      yourShelves: []
    }
    this.snackBar = this.snackBar.bind(this)
  }
  //Snackbar functions have to stay in App so they don't dismount when App's
  //children dismount. This function takes a prop from the child component
  //in WhichButton.jsx and renders the right message.
  snackBar(type) {
    console.log('ABOUT TO SNACKKKKKKKK ON', type)
    const message = type => {
      switch (type) {
        case 'add':
          return 'This book will appear on your Dashboard.'
          break
        case 'approve':
          return 'Approving swap request...'
          break
        case 'cancel':
          return 'Canceling swap request...'
          break
        case 'delete':
          return 'Removing book from your collection...'
          break
        case 'deny':
          return 'Denying swap request...'
          break
        case 'swap':
          return 'This request will appear on your Dashboard.'
          break
        default:
          return ''
      }
    }
    this.setState({
      message: message(type)
    })
    setTimeout(() => {
      this.setState({ message: '' })
    }, 3000)
  }
  //Get the user's login username
  loggedUser() {
    f('GET', '/api/users/logged', response => {
      this.setState({ loggedUser: response })

      //Call populate shelves fns and checkLibrary with loggedUser as argument
      this.getLocation(response)
      this.populateMyShelves(response)
      this.populateOtherShelves(response)
      this.checkLibrary(response)
    })
  }
  //Get the user's location to show on their profile
  getLocation(loggedUser) {
    f('GET', '/api/' + loggedUser + '/location', response => {
      this.setState({ loggedLocation: response })
    })
  }
  //Populates the Community tab
  populateOtherShelves(loggedUser) {
    f('GET', '/api/' + loggedUser + '/otherBooks', response => {
      this.setState({ otherShelves: response })
    })
  }
  //Populates user's books in the Dashboard
  populateMyShelves(loggedUser) {
    f('GET', '/api/' + loggedUser + '/userBooks', response => {
      this.setState({ yourShelves: response })
    })
  }
  /* Keeps personal and full libraries in sync among devices without
   * refresh using web sockets. Will update state every second without
   * the `if` statements. However, not constantly updating state causes
   * the NavBar not to auto-resize on window resize. */
  checkLibrary(user) {
    librarian(1000, user, result => {
      //user's books
      if (result[0] && JSON.stringify(this.state.yourShelves) !== JSON.stringify(result[0])) {
        this.setState({ yourShelves: result[0] })
      }
      //other people's books
      if (result[1] && JSON.stringify(this.state.otherShelves) !== JSON.stringify(result[1])) {
        this.setState({ otherShelves: result[1] })
      }
      //All requested books
      if (result[2] && JSON.stringify(this.state.requestedBooks) !== JSON.stringify(result[2])) {
        this.setState({ requestedBooks: result[2] })
      }
      //User's requests
      if (result[3] && JSON.stringify(this.state.yourRequests) !== JSON.stringify(result[3])) {
        this.setState({ yourRequests: result[3] })
      }
      //Requests for user's books
      if (result[4] && JSON.stringify(this.state.requestsForYou) !== JSON.stringify(result[4])) {
        this.setState({ requestsForYou: result[4] })
      }
    })
  }
  //Views
  allbooksfn() {
    this.setState({
      addBooks: false,
      yourBooks: false,
      allBooks: true,
      profile: false
    })
  }
  addbooksfn() {
    this.setState({
      addBooks: true,
      yourBooks: false,
      allBooks: false,
      profile: false
    })
  }
  yourbooksfn() {
    this.setState({
      addBooks: false,
      yourBooks: true,
      allBooks: false,
      profile: false
    })
  }
  profilefn() {
    this.setState({
      addBooks: false,
      yourBooks: false,
      allBooks: false,
      profile: true
    })
  }
  //Start Up
  componentWillMount() {
    this.loggedUser()
  }
  render() {
    //constants
    const { snackBar } = this

    const {
      addBooks,
      allBooks,
      loggedLocation,
      loggedUser,
      message,
      otherShelves,
      profile,
      requestedBooks,
      requestsForYou,
      yourBooks,
      yourRequests,
      yourShelves
    } = this.state

    //NavBar.jsx
    //Creates top toolbar that allows instant navigation among components
    const navbar = (
      <NavBar
        addbooksfn={() => {
          this.addbooksfn()
        }}
        allbooksfn={() => {
          this.allbooksfn()
        }}
        loggedUser={loggedUser}
        profilefn={() => {
          this.profilefn()
        }}
        yourbooksfn={() => {
          this.yourbooksfn()
        }}
      />
    )

    //Dashboard.jsx
    //Displays your books
    //Displays requests you've made
    //Displays requests for your books
    const dashboardComponent = (
      <Dashboard
        location={requestsForYou}
        loggedUser={loggedUser}
        requestsForYou={requestsForYou}
        snackBar={snackBar}
        yourRequests={yourRequests}
        yourShelves={yourShelves}
      />
    )

    //AddBooks.jsx
    //Search OpenLibrary.org for books you own
    //Add them to your collection
    const addBooksComponent = <AddBooks loggedUser={loggedUser} snackBar={snackBar} />

    //Community.jsx
    //Allows user to see other people's books
    //Allows user to request swaps
    const communityComponent = (
      <Community
        loggedUser={loggedUser}
        otherShelves={otherShelves}
        requestedBooks={requestedBooks}
        requestor={loggedUser}
        snackBar={snackBar}
      />
    )

    //Profile.jsx
    //Displays username and location
    //Allows user to change password
    const profileComponent = <Profile loggedLocation={loggedLocation} loggedUser={loggedUser} />

    return (
      <div>
        {/* NavBar.jsx */}
        {navbar}
        {/* AddBooks.jsx */}
        {addBooks ? addBooksComponent : null}
        {/* Community.jsx */}
        {allBooks ? communityComponent : null}
        {/* Dashboard.jsx */}
        {yourBooks ? dashboardComponent : null}
        {/* Profile.jsx */}
        {profile ? profileComponent : null}
        {/* Snack.jsx */}
        <Snack message={message} />
      </div>
    )
  }
}
