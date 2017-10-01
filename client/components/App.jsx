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
import RequestsBadge from './RequestsBadge.jsx'
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
      myShelves: [],
      otherShelves: [],
      requestedBooks: [],
      myRequests: [],
      requestsForMe: [],
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
  /* Keeps personal and full library in sync among devices without *
   * refresh using web sockets.                                    */
  checkLibrary(user) {
    librarian(1000, user, result => {
      //myBooks
      if (result[0] && this.state.myShelves !== result[0]) {
        this.setState({ myShelves: result[0] })
      }
      //otherBooks
      if (result[1] && this.state.otherShelves !== result[1]) {
        this.setState({ otherShelves: result[1] })
      }
      //All requested books
      if (result[2] && this.state.requestedBooks !== result[2]) {
        this.setState({ requestedBooks: result[2] })
      }
      //My requests
      if (result[3] && this.state.myRequests !== result[3]) {
        this.setState({ myRequests: result[3] })
      }
      //Requests for my books
      if (result[4] && this.state.requestsForMe !== result[4]) {
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
            <h3>Others' Books Available to Swap</h3>
            <div className="allBooksHeader">
              <div>
                Click the{' '}
                <ActionSwapVerticalCircle style={{ marginBottom: -6 }} /> to
                request a trade!
              </div>
              <RequestsBadge
                myRequests={this.state.myRequests.length}
                requestsForMe={this.state.requestsForMe.length}
              />
            </div>
            <Divider />
            <h3>Requested Books</h3>
            {this.state.requestedBooks.length ? (
              <Library
                location={this.state.requestedBooks}
                loggedUser={this.state.loggedUser}
              />
            ) : (
              <div>Nobody has requested any books...</div>
            )}
            <Divider />
            <h3>Others' Books...</h3>
            {this.state.otherShelves.length ? (
              <Library
                location={this.state.otherShelves}
                whichButton={'swap'}
                requestor={this.state.loggedUser}
                loggedUser={this.state.loggedUser}
              />
            ) : (
              <div>Nothing to show here. Every book has been requested.</div>
            )}
          </div>
        ) : (
          <span />
        )}

        {/*MY BOOKS*/}
        {this.state.myBooks ? (
          <div>
            <h3>Your Books Available to Swap</h3>
            <RequestsBadge
              myRequests={this.state.myRequests.length}
              requestsForMe={this.state.requestsForMe.length}
            />
            <Divider />
            <h3>Your Books...</h3>
            <Library location={this.state.myShelves} whichButton={'delete'} />
            <Divider />
            <h3>Books You've Requested...</h3>
            <Library
              location={this.state.myRequests}
              whichButton={'cancelRequest'}
              loggedUser={this.state.loggedUser}
            />
            <Divider />
            <h3>Someone's Requested These...</h3>
            <Library
              location={this.state.requestsForMe}
              whichButton="approveDeny"
              loggedUser={this.state.loggedUser}
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
