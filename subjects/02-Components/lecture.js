import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class ContentToggle extends React.Component {
    static defaultProps = {
        summary: 'Tacos'
    };

    static propTypes = {
        summary: PropTypes.string.isRequired,
        children: PropTypes.node,
        onToggle: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    handleClick() {
        this.setState({
            isOpen: !this.state.isOpen
        }, () => {
          // Now you can safely read from this.state
          if (this.props.onToggle) {
            this.props.onToggle(this.state.isOpen);
          }
        });
    }

    handleClickWithArrow = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        let summaryClassName = 'content-toggle-summary';

        if (this.state.isOpen) {
            summaryClassName += ' content-toggle-summary-open';
        }

        return (
            <div className="content-toggle">
                <button
                    onClick={() => this.handleClick()}
                    className={summaryClassName}
                >
                    <span>{this.props.summary}</span>
                </button>
                <button
                    onClick={this.handleClickWithArrow}
                    className={summaryClassName}
                >
                    <span>{`${this.props.summary} with arrow`}</span>
                </button>
                {this.state.isOpen && (
                    <div className="content-toggle-details">
                        {this.props.children}
                    </div>
                )}
            </div>
        );
    }
}

class App extends React.Component {
    state = { numToggles: 0 };

    handleToggle = () => {
        this.setState({
            numToggles: this.state.numToggles + 1
        });
    };

    render() {
        return (
            <div>
                <p>Number of toggles: {this.state.numToggles}</p>

                <ContentToggle summary="Burritos" onToggle={this.handleToggle}>
                    <p>
                        A Burrito is a traditional Mexican dish composed of a
                        corn or wheat tortilla folded or rolled around a
                        filling.
                    </p>
                </ContentToggle>

                <ContentToggle summary="Tacos" onToggle={this.handleToggle}>
                    <p>
                        A taco is a traditional Mexican dish composed of a corn
                        or wheat tortilla folded or rolled around a filling.
                    </p>
                </ContentToggle>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

////////////////////////////////////////////////////////////////////////////////
// What happens when we want to render 2 <ContentToggle>s? Shared mutable state!

////////////////////////////////////////////////////////////////////////////////
// React gives us a component model we can use to encapsulate state at the
// instance level, so each component instance has its own state. Let's refactor
// this code to use a JavaScript class that extends React.Component.

//////////////////////////////////////////////////////////////////////////////////
// React gives us setState and automatically re-renders as the state changes.

////////////////////////////////////////////////////////////////////////////////
// Let's make <ContentToggle> re-usable and render a few of them. Title and
// children are properties we can pass in from the parent component.

////////////////////////////////////////////////////////////////////////////////
// Wrap a few <ContentToggle>s in a <ToggleTracker> that tracks the # of times
// it has been toggled and shows a counter. <ContentToggle> gets an onToggle
// handler. This is like a "custom event".

////////////////////////////////////////////////////////////////////////////////
// We can use propTypes to declare the name, type, and even default value of
// our props. These are like "runnable docs" for our code.
