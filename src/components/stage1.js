import { Button, Form, Alert } from 'react-bootstrap';
import React, { useContext, useState, useRef } from 'react';
import { MyContext } from '../context';

const Stage1 = () => {

    const textInput = useRef();
    const context = useContext(MyContext);

    const [error, setError] = useState([false, ""])

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = textInput.current.value;
        const validate = validateInput(value);

        if (validate) {
            setError([false, ''])
            context.addPlayer(value)
            textInput.current.value = "";
        }
    }

    const validateInput = (value) => {
        if (value === '') {
            setError([true, "Name Field can't be empty!!"])
            return false;
        }
        if (value.length <= 1) {
            textInput.current.value = "";
            setError([true, "Please enter more than 1 letter!!"])
            return false;
        }

        return true;
    }

    return (
        <>
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder="Add Player Name"
                        name='player'
                        ref={textInput}
                    />
                </Form.Group>

                {
                    error[0] ? <Alert> {error[1]} </Alert>
                        : null
                }

                <Button className='miami' variant='primary' type='submit'>
                    Add Player
                </Button>

                {context.state.players && context.state.players.length > 0 ?
                    <>
                        <hr />
                        <div>
                            <ul className='list-group'>
                                {
                                    context.state.players.map((player, idx) => (
                                        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                                            {player}
                                            <span className='badge badge-danger'
                                                onClick={() => context.removePlayer(idx)} >
                                                X
                                            </span>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className='action_button'
                                onClick={() => context.next()}>
                                NEXT
                            </div>
                        </div>
                    </>
                    : null
                }

            </Form>
        </>
    )

}

export default Stage1;