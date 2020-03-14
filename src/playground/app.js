import React from 'react';
import Opt from './option'

const obj = {
    name: 'Vikram',
    getName() {
        return this.name
    }
}

class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.resetOptionIChose = this.resetOptionIChose.bind(this);
        this.state = {
            options: [],// props.option,//['Thing One', 'Thing Two', 'Thing Four']
            clearOptionClicked: false,
            resetOptionChose: 1
        }
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json)
            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {

        }


        // console.log("fecthing data");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState.options.length)
        console.log(this.state.options.length)
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
            console.log("saving data");
        }
        // console.log("saving datafdsfsdf");
    }

    componentWillUnmount() {
        console.log("component will unmount");
    }

    resetOptionIChose() {
        this.setState((prevState) => {

            return {
                options: prevState.resetOptionChose + 1
            }
        })
        console.log(this.state.resetOptionIChose)
    }

    handleDeleteOptions() {
        // below is a long hand of the code in the bottom
        // this.setState(() => {
        //     return {
        //         options: [],
        //         clearOptionClicked: true
        //     }
        // });
        this.setState(() => ({ options: [] }))
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }))
    }

    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option)
    }

    handleAddOption(option) {
        if (!option) {
            return 'Enter a valid value'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exist'
        }
        // this.setState((prevState) => {

        //     return {
        //         options: prevState.options.concat(option)
        //     }
        // })

        this.setState((prevState) => (
            { options: prevState.options.concat(option) }
        ))
    }

    render() {
        // const title = "Indecision App"
        const subtitle = "Put your life in the hand of a computer"
        // const options = ['Thing One', 'Thing Two', 'Thing Three']

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOptions
                    handleAddOption={this.handleAddOption}
                    optionNumber={this.state.options.length}
                />
            </div>
        )
    }
}

IndecisionApp.defaultProps = {

}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    )
}

Header.defaultProps = {
    title: "Indecision"
}

// class Header extends React.Component {

//     render() {

//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <h2>{this.props.subtitle}</h2>
//             </div>
//         )
//     }
// }

const Action = (props) => {
    return (
        <div>
            <div>
                <button
                    onClick={props.handlePick}
                    disabled={!props.hasOptions}>
                    What should I do?
                        </button>
            </div>
        </div>
    )
}

// class Action extends React.Component {

//     render() {
//         return (
//             <div>
//                 <button
//                     onClick={this.props.handlePick}
//                     disabled={!this.props.hasOptions}>
//                     What should I do?
//                 </button>
//             </div>
//         )
//     }
// }

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add a option to get started!</p>}
            {(props.options).map(element =>
                <Option
                    key={element}
                    optionText={element}
                    handleDeleteOption={props.handleDeleteOption}
                />
            )}
        </div>
    )
}

// class Options extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.handleRemoveAll = this.handleRemoveAll.bind(this)
//     // }
//     // handleRemoveAll() {
//     //     console.log(this.props.options)
//     //     alert('handle Remove All')
//     // }


//     render() {
//         // console.log(this.props)
//         return (
//             <div>
//                 <button onClick={this.props.handleDeleteOptions}>Remove All</button>

//                 {(this.props.options).map(element =>
//                     <Option key={element} optionText={element} />
//                 )}
//             </div>
//         )
//     }
// }

const Option = (props) => {
    return (
        <div>

            {props.optionText}
            <button
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText);
                }}
            >
                Remove
            </button>
        </div>
    )
}

// class Option extends React.Component {
//     render() {
//         // console.log("under Option component")
//         // console.log(this.props)
//         return (
//             <div>

//                 {this.props.optionText}

//             </div>
//         )
//     }
// }


class AddOptions extends React.Component {
    constructor(props) {
        super(props);
        // console.log("AddOptions Props")
        // console.log(props)
        this.handleAddOption = this.handleAddOption.bind(this);

        this.state = {
            error: undefined
        }

    }
    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.option.value.trim()
        const error = this.props.handleAddOption(option)
        e.target.option.value = ""
        // if (option) {

        //     e.target.option.value = ""
        // }
        // console.log("error inside handleAddOption")
        // console.log(error)
        this.setState(() => ({ error }));
        if (!error) {
            e.target.elements.option.value = ""
        }

    }

    render() {
        console.log("Entering render under Handle Add Option")
        console.log(this.props)
        // if (this.props.optionNumber > 0)
        // const v = this.props.resetOptionIChose()
        return (

            <div>
                {this.state.error && (this.props.optionNumber > 0) && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>

            </div>

        )

    }
}

const User = (props) => {

    return (

        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    )

}

function jsx() {
    return (
        <div>
            <h1>Title</h1>

            <Header />
            <Action />
            <Options />
            <AddOptions />
        </div>
    )
}

export { IndecisionApp as default }
// export default IndecisionApp