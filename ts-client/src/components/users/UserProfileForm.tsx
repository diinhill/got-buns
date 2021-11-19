import { useState } from 'react'
import { Container, Row, Col, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
import { AllUsers } from '../../@types'
import ImageUpload from '../core/ImageUpload'

interface Props {
    newUser: Partial<AllUsers.User>
    handlePhoto: (photo: File) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.SyntheticEvent) => void
}


const UserProfileForm: React.FC<Props> = ({ newUser, handleChange, handlePhoto, handleSubmit }) => {

    const [first2Focus, setFirst2Focus] = useState(false)
    const [email2Focus, setEmail2Focus] = useState(false)

    return (

        <Container>
            <Row>
                <Col className="pr-2" md="6">
                    <label>Name</label>
                    <InputGroup
                        className={first2Focus ? "input-group-focus" : ""}
                    >
                        <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText> */}
                        </InputGroupAddon>
                        <Input
                            placeholder="Username"
                            type="text"
                            name='name'
                            onChange={handleChange}
                            value={newUser.name}
                            onFocus={() => setFirst2Focus(true)}
                            onBlur={() => setFirst2Focus(false)}
                        ></Input>
                    </InputGroup>
                </Col>
                <Col className="pl-2" md="6">
                    <ImageUpload avatar={false} handlePhoto={handlePhoto} />
                </Col>
                <Col className="pr-2" md="6">
                    <label>Email</label>
                    <InputGroup
                        className={first2Focus ? "input-group-focus" : ""}
                    >
                        <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText> */}
                        </InputGroupAddon>
                        <Input
                            placeholder="@"
                            type="text"
                            name='email'
                            onChange={handleChange}
                            value={newUser.email}
                            onFocus={() => setFirst2Focus(true)}
                            onBlur={() => setFirst2Focus(false)}
                        ></Input>
                    </InputGroup>
                </Col>
                <Col className="pr-2" md="6">
                    <label>Password</label>
                    <InputGroup
                        className={first2Focus ? "input-group-focus" : ""}
                    >
                        <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText> */}
                        </InputGroupAddon>
                        <Input
                            placeholder="Password"
                            type="text"
                            name='password'
                            onChange={handleChange}
                            value={newUser.password}
                            onFocus={() => setFirst2Focus(true)}
                            onBlur={() => setFirst2Focus(false)}
                        ></Input>
                    </InputGroup>
                </Col>
                <Col className="pr-2" md="6">
                    <label>Profession</label>
                    <InputGroup
                        className={first2Focus ? "input-group-focus" : ""}
                    >
                        <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText> */}
                        </InputGroupAddon>
                        <Input
                            placeholder="Profession"
                            type="text"
                            name='profession'
                            onChange={handleChange}
                            value={newUser.profession}
                            onFocus={() => setFirst2Focus(true)}
                            onBlur={() => setFirst2Focus(false)}
                        ></Input>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                {/* <Col md="6">
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox"></Input>
                            <span className="form-check-sign"></span>
                            I'm not a robot
                        </Label>
                    </FormGroup>
                </Col> */}
                <Col md="6">
                    <Button
                        className="btn-round pull-right"
                        color="info"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Col>
            </Row>
        </Container>

    )
}
export default UserProfileForm

        // <div>
        //     <form encType='multipart/form-data'>
        //         <div className='field'>
        //             <label className='label'>name</label>
        //             <div className='control'>
        //                 <input className='input' type='text' name='name' onChange={handleChange} value={newUser.name} />
        //             </div>
        //         </div>
        //         <div className='field'>
        //             <label className='label'>choose profile picture</label>
        //             <div className='control' id='imgfile'>
        //                 <input className='input' type='file' name='photo' onChange={handlePhoto} />
        //             </div>
        //         </div>
        //         <div className='field'>
        //             <label className='label'>profession</label>
        //             <div className='control'>
        //                 <input className='input' type='text' name='profession' onChange={handleChange} value={newUser.profession} />
        //             </div>
        //         </div>
        //         <button className='button' type='submit' onClick={handleSubmit}>submit</button>
        //     </form>
        // </div>
