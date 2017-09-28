'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Material UI
import ActionSwapVerticalCircle from 'material-ui/svg-icons/action/swap-vertical-circle'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

//App
import BadgeExampleSimple from './Requests.jsx'
import BookSearch from './BookSearch.jsx'
import Input from './Input.jsx'
import Library from './Library.jsx'
import NavBar from './NavBar.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'
import { librarian } from '../controllers/socket.client.jsx'

/*** VARIABLES ***/
const style = {
  margin: 5
}

/*** MAIN ***/
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookSearch: [],
      library: [],
      userShelves: [],
      myBooks: true,
      addBooks: false,
      allBooks: false,
      profile: false,
      loggedUser: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearBooks = this.clearBooks.bind(this)
  }
  handleSubmit() {
    const query = document.getElementById('search').value
    console.log(query)
    f('POST', '/api/search/' + query, response => {
      console.log('Search response', response)
      this.setState({ bookSearch: response })
    })
  }
  loggedUser() {
    f('GET', '/api/users/logged', response => {
      this.setState({ loggedUser: response })

      //Call populateUserShelves and checkLibrary with loggedUser as argument
      this.populateUserShelves(response)
      this.checkLibrary(response)
    })
  }
  populateLibrary() {
    f('GET', '/api/library', response => {
      this.setState({ library: response })
    })
  }
  populateUserShelves(user) {
    f('GET', '/api/' + user + '/library', response => {
      this.setState({ userShelves: response })
    })
  }
  /* Keeps personal and full library in sync among devices without *
   * refresh using web sockets.                                    */
  checkLibrary(user) {
    librarian(1000, user, result => {
      if (result[0] && this.state.library !== result[0]) {
        this.setState({ library: result[0] })
      }
      if (result[1] && this.state.userShelves !== result[1]) {
        this.setState({ userShelves: result[1] })
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
    this.populateLibrary()
  }
  render() {
    return (
      <div>
        {/* NAVBAR */}
        <NavBar
          loggedUser={this.state.loggedUser}
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
        {/* SEARCH */}
        {this.state.addBooks ? (
          <div>
            <Input
              fn0={this.handleSubmit}
              fn1={this.clearBooks}
              visible={this.state.bookSearch.length > 0}
            />
            <br />
            <Divider />
            <BookSearch
              quest={this.state.bookSearch}
              user={this.state.loggedUser}
            />
          </div>
        ) : (
          <span />
        )}
        {/* ALL BOOKS */}
        {this.state.allBooks ? (
          <div>
            <h3>All Books</h3>
            <div className="allBooksHeader">
              <div>
                Click the{' '}
                <ActionSwapVerticalCircle style={{ marginBottom: -6 }} /> to
                request a trade!
              </div>
              <BadgeExampleSimple />
            </div>
            <Divider />
            <Library
              location={this.state.library}
              whichButton={this.state.myBooks ? 'delete' : 'swap'}
              user={this.state.loggedUser}
            />
          </div>
        ) : (
          <span />
        )}

        {/*MY BOOKS*/}
        {this.state.myBooks ? (
          <div>
            <h3>My Books Available to Swap</h3>
            <Divider />
            <Library
              location={this.state.userShelves}
              whichButton={this.state.myBooks ? 'delete' : 'swap'}
              user={this.state.loggedUser}
            />
          </div>
        ) : (
          <span />
        )}

        {/* PROFILE */}
        {this.state.profile ? (
          <div>
            <h3>Update your profile</h3>
            <Divider />
            <h3>Personal Details</h3>
            <TextField
              hintText="Your username will be public."
              floatingLabelText="Username"
            />
            <br />
            <TextField
              hintText="City and state or province"
              floatingLabelText="Location"
            />
            <br />
            <RaisedButton label="Save Changes" primary={true} style={style} />
            <br />
            <br />
            <Divider />
            <h3>Change your password</h3>
            <TextField
              hintText="Use 12-72 letters and numbers."
              floatingLabelText="Current Password"
              type="password"
            />
            <br />
            <TextField
              hintText="Use 12-72 letters and numbers."
              floatingLabelText="New Password"
              type="password"
            />
            <br />
            <RaisedButton label="Save Changes" primary={true} style={style} />
            <br />
          </div>
        ) : (
          <span />
        )}
      </div>
    )
  }
}
