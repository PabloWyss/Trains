import React, {createRef, useState, useEffect, Component} from "react"
import trainAPI from "../axios/axios"
import StationCardView from "./stationCard"
import {v4 as uuidv4} from 'uuid';
import AffolternImage from "/src/assets/Affoltern.png"
import Connection from "./connection.tsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TrainView = () => {
    const [affolternTrain, setAffolternTrain] = useState({"station": {"name": "Name"}, "stationboard": []})
    const [zentenBus, setZentenBus] = useState({"station": {"name": "Name"}, "stationboard": []})
    const [fromInput, setFromInput] = useState("")
    const [toInput, setToInput] = useState("")
    const [styleTrain, setStyleTrain] = useState("border-b-2 border-solid")
    const [styleBus, setStyleBus] = useState("hover:border-b-2 border-solid")
    const [possibleOrigins, setPossibleOrigins] = useState([])
    const [possibleDestinations, setPossibleDestinations] = useState([])
    const [connections, setConnections] = useState([])
    const [submitClicked, setSubmitClicked] = useState(false)

    const ref = createRef(null)

    useEffect(() => {
        fetchTrainsAffoltern();
        fetchBusZentenhausplatz();

    }, []);

    const fetchTrainsAffoltern = () => {
        trainAPI.get("stationboard?id=8503008&limit=9")
            .then(response => {
                setAffolternTrain(response.data)
            })
            .catch(error => console.log(error))
    };
    const fetchBusZentenhausplatz = () => {
        trainAPI.get("stationboard?id=8576262&limit=9")
            .then(response => {
                setZentenBus(response.data)
            })
            .catch(error => console.log(error))
    };

    const fetchTrainStations = (input, requestFrom) => {
        trainAPI.get(`locations?query=${input}&limit=10`)
            .then(response => {
                if (requestFrom == "Origin") {
                    setPossibleOrigins(response.data.stations)
                } else {
                    setPossibleDestinations(response.data.stations)
                }
            })
            .catch(error => console.log(error))
    }

    const handleInputFrom = (e) => {
        e.preventDefault()
        setFromInput(e.target.value)
        fetchTrainStations(e.target.value, "Origin")
    }

    const handleInputTo = (e) => {
        e.preventDefault()
        setToInput(e.target.value)
        fetchTrainStations(e.target.value, "Destination")
    }

    const styleActive = "border-b-2 border-solid"
    const styleInactive = "hover:border-b-2 border-solid"

    const handleClickTrainBuss = (e) => {
        e.preventDefault()
        if (e.target.id == "train") {
            setStyleTrain(styleActive)
            setStyleBus(styleInactive)
        } else {
            setStyleBus(styleActive)
            setStyleTrain(styleInactive)
        }

    }

    const fetchConections = (origin, destination) => {
        trainAPI.get(`connections?from=${origin}&to=${destination}`)
            .then(response => {
                setConnections(response.data.connections)
            })
            .catch(error => console.log(error))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        fetchConections(fromInput, toInput)
        setSubmitClicked(!submitClicked)
    }

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };

    const props = {width: 400, height: 250, zoomWidth: 500, img: AffolternImage};


    return (
        <div ref={ref} className="flex flex-col justify-center">
            <div className="flex flex-col justify-center items-center">
                <img src={AffolternImage} className={"h-20 w-2/5"}/>
                <h1 className="font-bold  justify-center">
                    Panchito's trains from home
                </h1>
            </div>
            <div className="flex justify-center">
                <ul className="flex w-full justify-center gap-4">
                    <li className={styleTrain} id="train" onClick={handleClickTrainBuss}>Trains</li>
                    <li className={styleBus} id="buses" onClick={handleClickTrainBuss}>Busses</li>
                </ul>
            </div>
            {styleTrain == styleActive ?
                <div className={"flex flex-col"}>
                    <div>
                        <h2>
                            {affolternTrain.station.name}
                        </h2>
                    </div>
                    <div className="flex gap-4 w-full items-center justify-center">
                        <Carousel responsive={responsive}
                                  // autoPlay={true}
                                  // autoPlaySpeed={2000}
                                  // keyBoardControl={true}
                                  // customTransition="all 1"
                                  // transitionDuration={500}
                                  infinite={true}
                                  ssr={true}
                                  swipeable={false}
                                  draggable={true}
                                  showDots={false}
                                  containerClass="carousel-container"
                                  dotListClass="custom-dot-list-style"
                                  itemClass="carousel-item-padding-40-px"
                                  className="w-4/5"

                        >
                            {
                                affolternTrain.stationboard.map((transport) => {
                                    return (
                                        <div className="border border-indigo-600 gap-4 w-full" key={uuidv4()}>
                                            <StationCardView transport={transport}/>
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                </div> :
                <div>
                    <h2>
                        {zentenBus.station.name}
                    </h2>
                    <div className="grid grid-cols-4 gap-4">
                        {
                            zentenBus.stationboard.map((transport) => {
                                return (
                                    <div className="border border-indigo-600" key={uuidv4()}>
                                        <StationCardView transport={transport}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>


            }
            <div>
                <form onSubmit={handleOnSubmit}>
                    <label htmlFor={"from"}> From </label>
                    <input id="from" type="text" list="from-list" onChange={handleInputFrom} value={fromInput}/>
                    <datalist id="from-list">
                        {possibleOrigins.map(
                            (opt, id) => <option key={id}>{opt.name}</option>
                        )}
                    </datalist>
                    <label htmlFor={"to"}> To</label>
                    <input type={"text"} id={"to"} list="to-list" value={toInput} onChange={handleInputTo}/>
                    <datalist id="to-list">
                        {possibleDestinations.map(
                            (opt, id) => <option key={id * 1000}>{opt.name}</option>
                        )}
                    </datalist>
                    <button type={"submit"}>
                        Submit
                    </button>
                </form>
            </div>
            <div>
                {submitClicked ?
                    connections.map((connection) => {
                        return (
                            <Connection connection={connection}/>
                        )
                    })
                    :
                    null
                }
            </div>
        </div>
    )
}

export default TrainView