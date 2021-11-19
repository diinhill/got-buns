/*eslint-disable*/
import React, { useEffect, useState } from "react"
// plugin that creates slider
import Slider from "nouislider"
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Collapse,
    Label,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    DropdownMenu,
    DropdownItem,
} from "reactstrap"
// import Select from "react-select"
import defaultFood from '../../assets/img/fooditem.jpg'
import { Fooditem, FooditemTypes } from "../../@types"
import { useHistory } from "react-router"

interface Props {
    fooditems: Fooditem[]
}

const FooditemsList: React.FC<Props> = ({ fooditems }) => {

    // focus for inputs
    const [emailFocus, setEmailFocus] = useState(false)
    // collapse states and functions
    const [collapses, setCollapses] = useState<number[]>([1, 2]);
    const changeCollapse = (collapse: number) => {
        if (collapses.includes(collapse)) {
            setCollapses(collapses.filter((prop) => prop !== collapse));
        } else {
            setCollapses([...collapses, collapse]);
        }
    }
    // slider states and functions
    const [sliderMin, setSliderMin] = useState<number>(1)
    const [sliderMax, setSliderMax] = useState<number>(100)

    useEffect(() => {
        // if (
        //     !document.getElementById("sliderRefine")?.classList.contains("noUi-target") 
        // ) {
        //     Slider.create(document.getElementById("sliderRefine"), {
        //         start: [sliderMin, sliderMax],
        //         connect: [false, true, false],
        //         step: 1,
        //         range: { min: 30, max: 900 },
        //     }).on("update", function (values: number) {
        //         setSliderMin(Math.round(values[0]));
        //         setSliderMax(Math.round(values[1]));
        //     }); 
        // }

        document.body.classList.add("ecommerce-page")
        document.body.classList.add("sidebar-collapse")
        document.documentElement.classList.remove("nav-open")
        window.scrollTo(0, 0)
        document.body.scrollTop = 0
        return function cleanup() {
            document.body.classList.remove("ecommerce-page")
            document.body.classList.remove("sidebar-collapse")
        }
    }, [])

    const history = useHistory()
    const [singleSelect, setSingleSelect] = React.useState<FooditemTypes | null>(null)

    return (

        <div className="wrapper">
            <div className="main">
                <div className="section">
                    <Container>
                        <h2 className="section-title">Food Items</h2>
                        <Row>
                            <Col md="3">
                                <div className="collapse-panel">
                                    <CardBody>
                                        <Card className="card-refine card-plain">
                                            <CardTitle tag="h4">
                                                Refine{" "}
                                                <Button
                                                    className="btn-icon btn-neutral pull-right"
                                                    color="default"
                                                    id="tooltip633919451"
                                                >
                                                </Button>
                                                <UncontrolledTooltip
                                                    delay={0}
                                                    target="tooltip633919451"
                                                >
                                                    Reset Filter
                                                </UncontrolledTooltip>
                                            </CardTitle>
                                            <CardHeader id="headingOne" role="tab">
                                                <h6 className="mb-0">
                                                    <a
                                                        className="text-info"
                                                        aria-expanded={collapses.includes(1)}
                                                        data-toggle="collapse"
                                                        data-parent="#accordion"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            changeCollapse(1)
                                                        }}
                                                    >
                                                        Price range{" "}
                                                    </a>
                                                </h6>
                                            </CardHeader>
                                            <Collapse isOpen={collapses.includes(1)}>
                                                <CardBody>
                                                    <span
                                                        className="price-left pull-left"
                                                        id="price-left"
                                                    >
                                                        €{sliderMin}
                                                    </span>
                                                    <span
                                                        className="price-right pull-right"
                                                        id="price-right"
                                                    >
                                                        €{sliderMax}
                                                    </span>
                                                    <div className="clearfix"></div>
                                                    <div
                                                        className="slider slider-refine"
                                                        id="sliderRefine"
                                                    ></div>
                                                </CardBody>
                                            </Collapse>
                                        </Card>
                                        <Card className="card-refine card-plain">
                                            <CardHeader id="headingTwo" role="tab">
                                                <h6>
                                                    <a
                                                        className="text-info"
                                                        aria-expanded={collapses.includes(2)}
                                                        data-toggle="collapse"
                                                        data-parent="#accordion"
                                                        href="#pablo"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            changeCollapse(2)
                                                        }}
                                                    >
                                                        Type{" "}
                                                    </a>
                                                </h6>
                                            </CardHeader>
                                            {/*<Collapse isOpen={collapses.includes(2)}>
                                            <Col lg="5" md="6" sm="3">
                                                <Select
                                                    className="react-select react-select-primary"
                                                    classNamePrefix="react-select"
                                                    name="singleSelect"
                                                    value={singleSelect}
                                                    onChange={(value: any) => {
                                                        return setSingleSelect(value);
                                                    }}
                                                    options={[Object.keys(FooditemTypes).map(type => {
                                                        value: { type }
                                                        label: "Single Option"
                                                        isDisabled: true
                                                    })
                                                        ,
                                                        { value: "2", label: "Foobar" },
                                                        { value: "3", label: "Is great" }
                                                    ]}
                                                    placeholder="Single Select"
                                                />
                                            </Col>
                                            </Collapse> */}
                                        </Card>
                                    </CardBody>
                                </div>
                            </Col>
                            <Col md="9">
                                <Row>
                                    <Col lg="4" md="6">
                                        {fooditems.map((fooditem, i) =>
                                            <Card className="card-product card-plain" key={i}>
                                                <div className="card-image">
                                                    <a onClick={() => history.push(`/users/profile/restaurants/${fooditem.restaurantID}/fooditems/${fooditem._id}`)}>
                                                        <img
                                                            alt="..."
                                                            src={fooditem.photo ? `http://localhost:5000/images/${fooditem.photo}` : defaultFood}
                                                        ></img>
                                                    </a>
                                                </div>
                                                <CardBody>
                                                    <a onClick={() => history.push(`/users/profile/restaurants/${fooditem.restaurantID}/fooditems/${fooditem._id}`)}>
                                                        <CardTitle tag="h4">{fooditem.name}</CardTitle>
                                                    </a>
                                                    <i><p className="card-description">{fooditem.type}</p></i>
                                                    <CardFooter>
                                                        <div className="price-container">
                                                            <span className="price">€ {fooditem.price}</span>
                                                        </div>
                                                        <Button
                                                            className="btn-neutral btn-icon btn-round pull-right"
                                                            color="danger"
                                                            data-placement="left"
                                                            id="tooltip719224088"
                                                        >
                                                            More
                                                        </Button>
                                                        {/* <UncontrolledTooltip
                                                                delay={0}
                                                                placement="left"
                                                                target="tooltip719224088"
                                                            >
                                                                Remove from wishlist
                                                            </UncontrolledTooltip> */}
                                                    </CardFooter>
                                                </CardBody>
                                            </Card>)}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>

    )
}
export default FooditemsList
