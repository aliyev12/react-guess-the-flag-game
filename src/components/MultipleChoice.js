import React, {Component} from 'react';

export class MultipleChoice extends Component {
  constructor (props) {
    super (props);
    this.state = {
      value: '',
    };
    this.handleOnChange = this.handleOnChange.bind (this);
    this.handleSubmit = this.handleSubmit.bind (this);
  }

  handleOnChange (e) {
    this.setState ({value: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault ();
    this.props.onGuess(this.state.value);
  }

  render () {
    const {choices} = this.props;
    let views = choices.map (choice => (
      <div key={choice.countryCode} className="form-check form-check-inline mx-5">
        <label className="form-check-label">
          <input
            type="radio"
            className="form-check-input"
            name="choice"
            onChange={this.handleOnChange}
            value={choice.countryCode}
          />
          {choice.name}
        </label>
      </div>
    ));
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset className="form-group">
          {views}
          <div className="mx-5 my-3 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary mx-auto">GUESS</button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default MultipleChoice;
