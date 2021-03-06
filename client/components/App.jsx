'use strict'

/*** ENVIRONMENT ***/
import dotenv from 'dotenv'
dotenv.load()

/*** DEVELOPMENT TOOLS ***/
const PROD = process.env.NODE_ENV === 'production'
const DEV = process.env.NODE_ENV === 'development'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Material UI
import ActionSwapVerticalCircle from 'material-ui/svg-icons/action/swap-vertical-circle'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import { Tabs, Tab } from 'material-ui/Tabs'

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
      loggedLocation: '',
      loggedUser: '',
      message: '',
      otherShelves: [],
      requestedBooks: [],
      requestsForYou: [],
      yourRequests: [],
      yourShelves: []
    }
    this.snackBar = this.snackBar.bind(this)
  }
  //Snackbar functions have to stay in App so they don't dismount when App's
  //children dismount. This function takes a prop from the child component
  //in WhichButton.jsx and renders the right message.
  snackBar(type) {
    if (DEV) {
      console.log('snackBar received:', type)
    }
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
      if (DEV) {
        console.log('loggedUser:', response)
      }
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
  //Start Up
  componentWillMount() {
    if (PROD) {
      console.log(
        'Thanks for visiting my website! I am available for hire. Please check out https://charmed.tech to get in touch!'
      )
    }

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
    //Creates top toolbar that shows the username and controls Logout
    const navbar = <NavBar loggedUser={loggedUser} />

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
        <Tabs>
          <Tab label="Dashboard">
            {/* Dashboard.jsx */}
            {dashboardComponent}
          </Tab>
          <Tab label="Add Books">
            {/* AddBooks.jsx */}
            {addBooksComponent}
          </Tab>
          <Tab label="Community">
            {/* Community.jsx */}
            {communityComponent}
          </Tab>
          <Tab label="Profile">
            {/* Profile.jsx */}
            {profileComponent}
          </Tab>
        </Tabs>
        {/* Snack.jsx */}
        <Snack message={message} />
      </div>
    )
  }
}
