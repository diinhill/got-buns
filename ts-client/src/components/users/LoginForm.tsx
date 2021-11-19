import React, { useState } from 'react'
import defaultBgImage from '../../assets/img/chumbucket.png'
import { Container, Row, Col, Card, Form, CardHeader, CardBody, InputGroup, InputGroupAddon, InputGroupText, Input, CardFooter, Button } from 'reactstrap'
import { AllUsers } from '../../@types'

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.SyntheticEvent) => void
    newUser: Partial<AllUsers.User>
}

const LoginForm: React.FC<Props> = ({ newUser, handleChange, handleSubmit }) => {

    const [pwFocus, setPwFocus] = useState(false)
    const [email2Focus, setEmail2Focus] = useState(false)

    return (

        <div className="content">
            <Container>
                <Row>
                    <Col className="ml-auto mr-auto" md="5">
                        <Card className="card-login card-plain">
                            <Form action="" className="form" method="">
                                <CardHeader className="text-center">
                                    <div className="logo-container">
                                        <img
                                            alt="..."
                                            src={defaultBgImage}
                                        ></img>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <InputGroup
                                        className={
                                            "no-border input-lg" +
                                            (email2Focus ? " input-group-focus" : "")
                                        }
                                    >
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                {/* <i className="now-ui-icons users_circle-08"></i> */}
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Email"
                                            type="email"
                                            value={newUser.email}
                                            name='email'
                                            onChange={handleChange}
                                            onFocus={() => setEmail2Focus(true)}
                                            onBlur={() => setEmail2Focus(false)}
                                        ></Input>
                                    </InputGroup>
                                    <InputGroup
                                        className={
                                            "no-border input-lg" +
                                            (pwFocus ? " input-group-focus" : "")
                                        }
                                    >
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                {/* <i className="now-ui-icons text_caps-small"></i> */}
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            value={newUser.password}
                                            name='password'
                                            onChange={handleChange}
                                            onFocus={() => setPwFocus(true)}
                                            onBlur={() => setPwFocus(false)}
                                        ></Input>
                                    </InputGroup>
                                </CardBody>
                                <CardFooter className="text-center">
                                    <Button
                                        block
                                        className="btn-round"
                                        color="info"
                                        onClick={handleSubmit}
                                        size="lg"
                                    >
                                        Sign In
                                    </Button>
                                </CardFooter>
                                {/* <div className="pull-left">
                      <h6>
                        <a
                          className="link footer-link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Create Account
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link footer-link"
                          onClick={(e) => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div> */}
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}
export default LoginForm

        // <div>
        //     <div className='field'>
        //         <label className='label'>email</label>
        //         <div className='control'>
        //             <input className='input' is-outlined required type='email' name='email' onChange={handleChange} value={state.email} />
        //         </div>
        //     </div>
        //     <div className='field'>
        //         <label className='label'>password</label>
        //         <div className='control'>
        //             <input className='input' is-outlined required type='password' name='password' onChange={handleChange} value={state.password} />
        //         </div>
        //     </div>
        //     <button className='button' is-contained type='submit' onClick={handleSubmit}>submit</button>
        //     <button className='button' is-contained type='submit' onClick={(() => history.push('/register'))}>create new account</button>
        // </div>

