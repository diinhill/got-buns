/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react"
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
import { Restaurant, RestaurantTypes } from "../@types"
import { useHistory } from "react-router"
import RestaurantsList from "../components/restaurants/RestaurantsList"
import { RestaurantContext } from "../context/RestaurantContext"


const AllRestaurantsView = () => {

    const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>()
    const { getAllRestaurants } = useContext(RestaurantContext)

    useEffect(() => {
        async function fetchData() {
            setAllRestaurants(getAllRestaurants())
        }
        fetchData()
    }, [])

    // focus for inputs
    const [emailFocus, setEmailFocus] = React.useState(false);
    // collapse states and functions
    const [collapses, setCollapses] = React.useState<number[]>([1, 2]);
    const changeCollapse = (collapse: number) => {
        if (collapses.includes(collapse)) {
            setCollapses(collapses.filter((prop) => prop !== collapse));
        } else {
            setCollapses([...collapses, collapse]);
        }
    };
    // slider states and functions
    const [sliderMin, setSliderMin] = React.useState<number>(1);
    const [sliderMax, setSliderMax] = React.useState<number>(100);

    React.useEffect(() => {
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


    // const [singleSelect, setSingleSelect] = React.useState<RestaurantTypes | null>(null)

    return (

        allRestaurants ?
            <div className="wrapper">
                <div className="main">
                    <div className="section">
                        <Container>
                            <h2 className="section-title">Restaurants</h2>
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
                                                                e.preventDefault();
                                                                changeCollapse(1);
                                                            }}
                                                        >
                                                            Distance{" "}
                                                        </a>
                                                    </h6>
                                                </CardHeader>
                                                <Collapse isOpen={collapses.includes(1)}>
                                                    <CardBody>
                                                        <span
                                                            className="price-left pull-left"
                                                            id="price-left"
                                                        >
                                                            km{sliderMin}
                                                        </span>
                                                        <span
                                                            className="price-right pull-right"
                                                            id="price-right"
                                                        >
                                                            km{sliderMax}
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
                                                                e.preventDefault();
                                                                changeCollapse(2);
                                                            }}
                                                        >
                                                            Type{" "}
                                                        </a>
                                                    </h6>
                                                </CardHeader>
                                                {/* <Collapse isOpen={collapses.includes(2)}> */}
                                                <Col lg="5" md="6" sm="3">
                                                    {/* <Select
                                                        className="react-select react-select-primary"
                                                        classNamePrefix="react-select"
                                                        name="singleSelect"
                                                        value={singleSelect}
                                                        onChange={(value: any) => {
                                                            return setSingleSelect(value);
                                                        }}
                                                        options={[Object.keys(RestaurantTypes).map(type => {
                                                            value: { type }
                                                            label: "Single Option"
                                                            isDisabled: true
                                                        })
                                                            // ,
                                                            // { value: "2", label: "Foobar" },
                                                            // { value: "3", label: "Is great" }
                                                        ]}
                                                        placeholder="Single Select"
                                                    /> */}
                                                </Col>
                                            </Card>
                                        </CardBody>
                                    </div>
                                </Col>

                                <Col md="9">
                                    <Row>
                                        <Col lg="4" md="6">
                                            <RestaurantsList allRestaurants={allRestaurants} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
            : null
    )
}
export default AllRestaurantsView
