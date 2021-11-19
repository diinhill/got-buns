import React from 'react'
import { Container, Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Label, Button } from 'reactstrap'
import { Restaurant } from '../../@types'
import ImageUpload from '../core/ImageUpload'

interface Props {
    handlePhoto: (photo: File) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.SyntheticEvent) => void
    newRestaurant: Partial<Restaurant>
}


const RestaurantForm: React.FC<Props> = ({ handlePhoto, handleChange, handleSubmit, newRestaurant }) => {

    const [first2Focus, setFirst2Focus] = React.useState(false)
    const [email2Focus, setEmail2Focus] = React.useState(false)

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
                            placeholder="Restaurant Name"
                            type="text"
                            name='name'
                            onChange={handleChange}
                            value={newRestaurant.name}
                            onFocus={() => setFirst2Focus(true)}
                            onBlur={() => setFirst2Focus(false)}
                        ></Input>
                    </InputGroup>
                </Col>
                <Col className="pl-2" md="6">
                    <ImageUpload avatar={false} handlePhoto={handlePhoto} />
                </Col>
                <Col className="pr-2" md="6">
                    <label>Street</label>
                    <InputGroup
                        className={first2Focus ? "input-group-focus" : ""}
                    >
                        <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText> */}
                        </InputGroupAddon>
                        <Input
                            placeholder="Street"
                            type="text"
                            name='street'
                            onChange={handleChange}
                            value={newRestaurant.street}
                            onFocus={() => setFirst2Focus(true)}
                            onBlur={() => setFirst2Focus(false)}
                        ></Input>
                    </InputGroup>
                </Col>
                <Col className="pr-2" md="6">
                    <label>Number</label>
                    <InputGroup
                        className={first2Focus ? "input-group-focus" : ""}
                    >
                        <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText> */}
                        </InputGroupAddon>
                        <Input
                            placeholder="Number"
                            type="text"
                            name='number'
                            onChange={handleChange}
                            value={newRestaurant.number}
                            onFocus={() => setFirst2Focus(true)}
                            onBlur={() => setFirst2Focus(false)}
                        ></Input>
                    </InputGroup>
                </Col>
                <Col className="pr-2" md="6">
                    <label>Postal Code</label>
                    <InputGroup
                        className={first2Focus ? "input-group-focus" : ""}
                    >
                        <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText> */}
                        </InputGroupAddon>
                        <Input
                            placeholder="postal code"
                            type="text"
                            name='postal'
                            onChange={handleChange}
                            value={newRestaurant.postal}
                            onFocus={() => setFirst2Focus(true)}
                            onBlur={() => setFirst2Focus(false)}
                        ></Input>
                    </InputGroup>
                </Col>
                <Col className="pr-2" md="6">
                    <label>Town</label>
                    <InputGroup
                        className={first2Focus ? "input-group-focus" : ""}
                    >
                        <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText> */}
                        </InputGroupAddon>
                        <Input
                            placeholder="Town"
                            type="text"
                            name='town'
                            onChange={handleChange}
                            value={newRestaurant.town}
                            onFocus={() => setFirst2Focus(true)}
                            onBlur={() => setFirst2Focus(false)}
                        ></Input>
                    </InputGroup>
                </Col>
                <Col className="pr-2" md="6">
                    <label>Phone</label>
                    <InputGroup
                        className={first2Focus ? "input-group-focus" : ""}
                    >
                        <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText> */}
                        </InputGroupAddon>
                        <Input
                            placeholder="Phone Number"
                            type="text"
                            name='phone'
                            onChange={handleChange}
                            value={newRestaurant.phone}
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
        </Container>)
}
export default RestaurantForm

 // <div>
        //     <form encType='multipart/form-data'>
        //         <div className='field'>
        //             <label className='label'>name</label>
        //             <div className='control'>
        //                 <input className='input' is-outlined required type='text' name='name' onChange={handleChange} value={newRestaurant.name} />
        //             </div>
        //         </div>
        //         <div className='field'>
        //             <label className='label'>choose restaurant picture</label>
        //             <div className='control' id='imgfile'>
        //                 <input className='input' is-outlined type='file' name='photo' onChange={handlePhoto} />
        //             </div>
        //         </div>
        //         <div className='field'>
        //             <label className='label'>street</label>
        //             <div className='control'>
        //                 <input className='input' is-outlined required type='text' name='street' onChange={handleChange} value={newRestaurant.street} />
        //             </div>
        //         </div>
        //         <div className='field'>
        //             <label className='label'>number</label>
        //             <div className='control'>
        //                 <input className='input' is-outlined required type='text' name='number' onChange={handleChange} value={newRestaurant.number} />
        //             </div>
        //         </div>
        //         <div className='field'>
        //             <label className='label'>postal</label>
        //             <div className='control'>
        //                 <input className='input' is-outlined required type='text' name='postal' onChange={handleChange} value={newRestaurant.postal} />
        //             </div>
        //         </div>
        //         <div className='field'>
        //             <label className='label'>town</label>
        //             <div className='control'>
        //                 <input className='input' is-outlined required type='text' name='town' onChange={handleChange} value={newRestaurant.town} />
        //             </div>
        //         </div>
        //         <div className='field'>
        //             <label className='label'>phone</label>
        //             <div className='control'>
        //                 <input className='input' is-outlined required type='text' name='phone' onChange={handleChange} value={newRestaurant.phone} />
        //             </div>
        //         </div>
        //         <button className='button' is-contained type='submit' onClick={handleSubmit}>submit</button>
        //     </form>
        // </div>