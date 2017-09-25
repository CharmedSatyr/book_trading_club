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
      myBooks: false,
      allBooks: true,
      profile: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearBooks = this.clearBooks.bind(this)
    this.allbooksfn = this.allbooksfn.bind(this)
  }
  handleSubmit() {
    const query = document.getElementById('search').value
    console.log(query)
    f('POST', '/api/search/' + query, response => {
      this.setState({ bookSearch: response })
    })
  }
  populateLibrary() {
    f('GET', '/api/library', response => {
      this.setState({ library: response })
    })
  }
  /* Keeps library in sync among devices without refresh using web sockets. */
  checkLibrary() {
    librarian(1000, result => {
      if (this.state.library !== result) {
        this.setState({ library: result })
      }
    })
  }
  clearBooks() {
    this.setState({ bookSearch: [] })
    document.getElementById('search').value = ''
  }
  componentWillMount() {
    this.populateLibrary()
    this.checkLibrary()
  }
  allbooksfn() {
    this.setState({
      myBooks: false,
      allBooks: true,
      profile: false
    })
  }
  mybooksfn() {
    this.setState({
      myBooks: true,
      allBooks: false,
      profile: false
    })
  }
  profilefn() {
    this.setState({
      myBooks: false,
      allBooks: false,
      profile: true
    })
  }
  logoutfn() {
    console.log('Logging out!')
  }
  render() {
    return (
      <div>
        <NavBar
          allbooksfn={() => {
            this.allbooksfn()
          }}
          mybooksfn={() => {
            this.mybooksfn()
          }}
          profilefn={() => {
            this.profilefn()
          }}
          logoutfn={() => {
            this.logoutfn()
          }}
        />
        <div>
          {/* ALL BOOKS */}
          {this.state.allBooks === true ? (
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
              <Library location={this.state.library} />
            </div>
          ) : (
            <span />
          )}

          {/*MY BOOKS*/}
          {this.state.myBooks === true ? (
            <div>
              <Input
                fn0={this.handleSubmit}
                fn1={this.clearBooks}
                visible={this.state.bookSearch.length > 0}
              />
              <br />
              <Divider />
              <BookSearch quest={this.state.bookSearch} />
            </div>
          ) : (
            <span />
          )}

          {/* PROFILE */}
          {this.state.profile === true ? (
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
      </div>
    )
  }
}
