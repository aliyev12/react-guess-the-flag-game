import React, {Component} from 'react';

export class Flag extends Component {
  render () {
    return (
      <div className="card mt-5 border border-dark w-50">
        <img
          className="card-img-top img-fluid"
          src={this.props.currentFlag.img}
          alt={this.props.currentFlag.countryCode}
        />
      </div>
    );
  }
}

export default Flag;
