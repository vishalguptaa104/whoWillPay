import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify'
const MyContext = React.createContext();

class MyProvider extends Component {

    state = {
        stage: 1,
        players: [],
        result: ''
    }

    addPlayerHandler = (name) => {
        this.setState((prevState) => ({
            players: [...prevState.players, name]
        }))
    }

    removePlayerHandler = (idx) => {
        let newAr = this.state.players;
        newAr.splice(idx, 1);
        this.setState({ players: newAr });
    }


    nextHandler = () => {
        const { players } = this.state;
        if (players.length < 2) {
            toast.error('You need more than 1 player', {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000
            });
        }
        else {
            this.setState({
                stage: 2
            }, () => {
                setTimeout(() => {
                    this.generateLooser()
                }, 1000)
            })
        }
    }


    generateLooser = () => {
        const { players } = this.state;
        this.setState({
            result: players[Math.floor(Math.random() * players.length)]
        })
    }

    resetGame = () => {

        this.setState({
            stage: 1,
            players: [],
            result: ''
        })

    }



    render() {
        return (
            <>
                <MyContext.Provider value={{
                    state: this.state,
                    addPlayer: this.addPlayerHandler,
                    removePlayer: this.removePlayerHandler,
                    next: this.nextHandler,
                    getNewlooser: this.generateLooser,
                    resetGame: this.resetGame
                }}>
                    {this.props.children}
                </MyContext.Provider>
                <ToastContainer />
            </>
        )
    }
}

export { MyContext, MyProvider }