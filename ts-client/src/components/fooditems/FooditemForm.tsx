import React from 'react'
import Switch from "react-bootstrap-switch"
import Datetime from 'react-datetime';
import { Container, Row, Col, InputGroup, InputGroupAddon, Input, Button, FormGroup, Label } from 'reactstrap'
import { Fooditem } from '../../@types'
import ImageUpload from '../core/ImageUpload'

interface Props {
    handlePhoto: (photo: File) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.SyntheticEvent) => void
    newFooditem: Partial<Fooditem>
}


const FooditemForm: React.FC<Props> = ({ handlePhoto, handleChange, handleSubmit, newFooditem }) => {

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
                            placeholder="Food Item Name"
                            type="text"
                            name='name'
                            onChange={handleChange}
                            value={newFooditem.name}
                            onFocus={() => setFirst2Focus(true)}
                            onBlur={() => setFirst2Focus(false)}
                        ></Input>
                    </InputGroup>
                </Col>
                <Col className="pl-2" md="6">
                    <ImageUpload avatar={false} handlePhoto={handlePhoto} />
                </Col>

                {/* needs to be Select from react-select */}
                {/* <Col className="pr-2" md="6">
                    <label>Type</label>
                    <InputGroup
                        className={first2Focus ? "input-group-focus" : ""}
                    >
                        <InputGroupAddon addonType="prepend">
                        </InputGroupAddon>
                        <Input
                            placeholder="Select Type"
                            type="select"
                            name='type'
                            onChange={handleChange}
                            value={newFooditem.type}
                            onFocus={() => setFirst2Focus(true)}
                            onBlur={() => setFirst2Focus(false)}
                        ></Input>
                    </InputGroup>
                </Col> */}

                <Col className="pr-2" md="6">
                    <label>Amount</label>
                    <InputGroup
                        className={first2Focus ? "input-group-focus" : ""}
                    >
                        <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText> */}
                        </InputGroupAddon>
                        <Input
                            placeholder="Number of Units"
                            type="text"
                            name='amount'
                            onChange={handleChange}
                            value={newFooditem.amount}
                            onFocus={() => setFirst2Focus(true)}
                            onBlur={() => setFirst2Focus(false)}
                        ></Input>
                    </InputGroup>
                </Col>
                <Col className="pr-2" md="6">
                    <label>Price</label>
                    <InputGroup
                        className={first2Focus ? "input-group-focus" : ""}
                    >
                        <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText> */}
                        </InputGroupAddon>
                        <Input
                            placeholder="Price in Euro"
                            type="text"
                            name='price'
                            onChange={handleChange}
                            value={newFooditem.price}
                            onFocus={() => setFirst2Focus(true)}
                            onBlur={() => setFirst2Focus(false)}
                        ></Input>
                    </InputGroup>
                </Col>

                {/* <Col className="pr-2" md="6">
                    <label>Purchase Date</label>
                    <FormGroup>
                        <Datetime value={newFooditem.purchaseDate} onChange={handleChange}
                            inputProps={{ placeholder: 'purchase date', name: 'purchaseDate' }}
                        />
                    </FormGroup>
                </Col>
                <Col className="pr-2" md="6">
                    <label>Due Date</label>
                    <FormGroup>
                        <Datetime value={newFooditem.dueDate} onChange={handleChange}
                            inputProps={{ placeholder: 'due date', name: 'dueDate' }}
                        />
                    </FormGroup>
                </Col> */}

                {/* <Col lg="3" sm="6">
                    <p className="category">Possible Swap</p>
                    {newFooditem.swapPossible === false ?
                        <Switch defaultValue={false} name='swapPossible' offColor="" onColor="" onChange={handleChange}>No</Switch>
                        // <br></br>
                        : <Switch value={true} name='swapPossible' offColor="" offText="" onColor="" onText="" onChange={handleChange}>Yes</Switch>}
                </Col> */}
                {/* <Col className="mb-4" lg="3" sm="6">
                    <p className="category">Possible Swap</p>
                    {(newFooditem.swapPossible === false || 'false') ?
                        <FormGroup check className="form-check-radio">
                            <Label check>
                                <Input
                                    defaultChecked
                                    value='false'
                                    id="exampleRadios1"
                                    name='swapPossible'
                                    type="radio"
                                    onChange={handleChange}
                                ></Input>
                                <span className="form-check-sign"></span>
                                No
                            </Label>
                        </FormGroup>
                        : <FormGroup check className="form-check-radio">
                            <Label check>
                                <Input
                                    value='true'
                                    id="exampleRadios1"
                                    name='swapPossible'
                                    type="radio"
                                    onChange={handleChange}
                                ></Input>
                                <span className="form-check-sign"></span>
                                Yes
                            </Label>
                        </FormGroup>}
                </Col> */}


                {/*  <Col className="pr-2" md="6">
                    <label>town</label>
                    <InputGroup
                        className={first2Focus ? "input-group-focus" : ""}
                    >
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="town"
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
                    <label>phone</label>
                    <InputGroup
                        className={first2Focus ? "input-group-focus" : ""}
                    >
                        <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText> 
                        </InputGroupAddon>
                        <Input
                            placeholder="phone"
                            type="text"
                            name='phone'
                            onChange={handleChange}
                            value={newRestaurant.phone}
                            onFocus={() => setFirst2Focus(true)}
                            onBlur={() => setFirst2Focus(false)}
                        ></Input>
                    </InputGroup>
                </Col> */}
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
export default FooditemForm


//          <div>
//             <form encType='multipart/form-data'>
//                 <div className='field'>
//                     <label className='label'>name</label>
//                     <div className='control'>
//                         <input className='input' required type='text' name='name' onChange={handleChange} value={newFooditem.name} />
//                     </div>
//                 </div>
//                 <div className='field'>
//                     <label className='label'>type</label>
//                     <div className='control'>
//                         <div className='select'>
//                             <select value={newFooditem.type} name='type' onChange={handleChange}>
//                                 <option value='vegetables'>vegetables</option>
//                                 <option value='fruits'>fruits</option>
//                                 <option value='breads'>breads</option>
//                                 <option value='dairy products'>dairy products</option>
//                                 <option value='meat'>dairy products</option>
//                                 <option value='other'>other</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='field'>
//                     <div className='field-label'>
//                         <label className='label'>swap possible?</label>
//                     </div>
//                     <div className='field-body'>
//                         <div className='field'>
//                             <div className='control'>
//                                 <label className='radio'>
//                                     <input type='radio' name='swapPossible' value='true' onChange={handleChange} />
//                                     yes
//                                 </label>
//                                 <label className='radio'>
//                                     <input type='radio' name='swapPossible' value='false' onChange={handleChange} />
//                                     no
//                                 </label>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='field'>
//                     <label className='label'>choose food picture</label>
//                     <div className='control' id='imgfile'>
//                         <input className='input' is-outlined type='file' name='photo' onChange={handlePhoto} />
//                     </div>
//                 </div>
//                 <div className='field'>
//                     <label className='label'>amount</label>
//                     <div className='control'>
//                         <input className='input' required type='text' name='amount' onChange={handleChange} value={newFooditem.amount} />
//                     </div>
//                 </div>
//                 <div className='field'>
//                     <label className='label'>price</label>
//                     <div className='control'>
//                         <input className='input' required type='text' name='price' onChange={handleChange} value={newFooditem.price} />
//                     </div>
//                 </div>
//                 <button className='button' is-contained type='submit' onClick={handleSubmit}>submit</button>
//             </form>
//         </div>