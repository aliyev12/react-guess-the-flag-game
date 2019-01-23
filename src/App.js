import React, {Component} from 'react';
import shuffle from 'shuffle-array';
import './App.css';

import Navbar from './components/Navbar';
import MultipleChoice from './components/MultipleChoice';
import Flag from './components/Flag';
import Score from './components/Score';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
            pastFlags: [],
            choices: [],
            currentFlag: {
                countryCode: '',
                img: '',
                countryName: '',
            },
            radioValue: '',
            guessed: 0,
            score: {
                correct: 0,
                wrong: 0,
                total: 0,
            },
            allAnswers: [],
        };
        this.handleOnNewGame = this.handleOnNewGame.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.onGuess = this.onGuess.bind(this);
    }

    componentDidMount() {
        const url = `https://restcountries.eu/rest/v2/all`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const countries = data.map(country => {
                    return {
                        countryCode: country.alpha3Code,
                        name: country.name,
                        flag: country.flag,
                        tested: false,
                    };
                });
                this.setState({countries});
            });
    }

    handleOnNewGame() {
        // Clear current state
        this.setState({
            pastFlags: [],
            choices: [],
            currentFlag: {
                countryCode: '',
                img: '',
                countryName: '',
            },
            score: {
                correct: 0,
                wrong: 0,
                total: 0,
            },
            allAnswers: [],
        });
        // Display a question
        this.nextQuestion();
    }

    nextQuestion() {
        // Create an array of never tested flags
        let neverTestedFlags = this.state.countries.filter(
            country => country.tested === false
        );

        // Shuffle never tested countries array
        neverTestedFlags = shuffle(neverTestedFlags);

        // Create random number from 0 to never tested array length minus one -> used for selecting a random array element
        const random = Math.floor(Math.random() * neverTestedFlags.length);

        // Pick 1 random country out of never tested shuffled countries array
        const countryToTest = neverTestedFlags[random];

        // Set the country within the array as tested and push that tested country to pastFlags attay within state
        const countries = [...this.state.countries];
        countries[random].tested = true;
        this.setState({
            countries,
            pastFlags: [...this.state.pastFlags, neverTestedFlags[random]],
        });

        // Set currentFlag of the state to be the flag img url of the countryToTest
        this.setState({
            currentFlag: {
                countryCode: countryToTest.countryCode,
                img: countryToTest.flag,
                countryName: countryToTest.name,
            },
        });

        /* Now create 4 choices from all countries regardless if they've been tested of not 
        where at least one country is the one of the currentFlag*/

        // Create an array that will hold 4 country objects including the countryToTest
        let choices = [countryToTest];

        // Loop through all the countries as long as the length of choices array is less than 4
        while (choices.length < 4) {
            // Take a copy of all the countries currently in the state
            let countries = [...this.state.countries];
            // Exclude the countryToTest country from the array so that you don't get more than one option for a country
            const countryCodes = choices.map(country => country.countryCode);
            countries = countries.filter(
                country => countryCodes.includes(country.countryCode) === false
            );
            // Shuffle the filtered array
            countries = shuffle(countries);
            // Create a random number from 0 to countries array length - 1
            const rand = Math.floor(Math.random() * countries.length);
            // Use that random number to pick a random country from the array
            choices.push(countries[rand]);
        }
        // Shuffle the array of choices that now should have 4 options, one of them being the currently tested flag
        choices = shuffle(choices);
        // Exclude everything but the country names from the choices array
        choices = choices.map(country => ({
            countryCode: country.countryCode,
            name: country.name,
        }));
        // Set current state choices array
        this.setState({choices});
    }

    onGuess(code) {
        const score = {...this.state.score};
        const {correct, wrong, total} = score;
        const country = [...this.state.countries].find(
            country =>
                country.countryCode === this.state.currentFlag.countryCode
        );
        const allAnswers = [...this.state.allAnswers];
        if (this.state.currentFlag.countryCode === code) {
            // You got it!
            score.correct = correct + 1;
            score.total = total + 1;
            allAnswers.push({
                guessed: true,
                countryName: country.name,
            });

            this.setState({
                guessed: 2,
                score,
                allAnswers,
            });
        } else {
            // Wong answer!
            score.wrong = wrong + 1;
            score.total = total + 1;
            allAnswers.push({
                guessed: false,
                countryName: country.name,
            });
            this.setState({
                guessed: 1,
                score,
                allAnswers,
            });
        }
        setTimeout(() => {
            this.setState({guessed: 0});
            this.nextQuestion();
        }, 3000);
    }

    render() {
        let flag, question, rightAnswer, wrongAnswer, score;
        const {countries, currentFlag, choices} = this.state;

        if (countries && countries.length > 0 && currentFlag.img) {
            flag = <Flag currentFlag={this.state.currentFlag} />;
        } else {
            flag = (
                <div className="jumbotron m-5">
                    <h1 className="display-4 text-center">
                        Welcome to Guess The Flag Game!
                    </h1>
                    <p className="lead text-center">
                        Click New Game button above to start playing
                        <p style={{fontSize: '70px'}}>
                            <span role="img" aria-label="Smiling face">
                                🙃
                            </span>
                        </p>
                    </p>
                </div>
            );
        }

        if (choices && choices.length > 0) {
            question = (
                <MultipleChoice
                    choices={this.state.choices}
                    onGuess={this.onGuess}
                />
            );
        }
        if (this.state.guessed === 2) {
            rightAnswer = (
                <div className="answer text-success d-flex justify-content-center align-items-center">
                    <div>
                        <i className="fas fa-check mr-5" />
                        You go it!
                    </div>
                </div>
            );
        }

        if (this.state.guessed === 1) {
            wrongAnswer = (
                <div>
                    <div className="answer text-danger d-flex justify-content-center align-items-center">
                        <div>
                            <i className="fas fa-times mr-2" />
                            Wrong answer!
                            <div className="correct-country text-dark py-3">
                                <p>Correct answer was:</p>
                                <p>
                                    <em>
                                        {this.state.currentFlag.countryName}
                                    </em>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (this.state.pastFlags && this.state.pastFlags.length > 0) {
            score = (
                <Score
                    {...this.state.score}
                    countries={this.state.countries.length}
                    allAnswers={this.state.allAnswers}
                />
            );
        }

        return (
            <>
                <Navbar />
                <div className="container d-flex justify-content-center align-items-center flex-column">
                    {question}
                    <button
                        onClick={this.handleOnNewGame}
                        type="button"
                        className="btn btn-outline-success"
                    >
                        <span className="h2">
                            New Game
                            <i className="far fa-play-circle ml-2" />
                        </span>
                    </button>
                    {flag}
                    {score}
                </div>
                {rightAnswer}
                {wrongAnswer}
            </>
        );
    }
}

export default App;
