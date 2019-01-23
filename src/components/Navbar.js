import React, { Component } from 'react'

export class Navbar extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light mb-5 py-5">
        <div className="container d-flex justify-content-center">
            <a className="navbar-brand"><span className="display-2 text-light text-center">Guess The Flag</span></a>
        </div>
    </nav>
    )
  }
}

export default Navbar
