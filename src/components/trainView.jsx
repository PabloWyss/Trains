import {useState, useEffect} from "react"
import trainAPI from "../axios/axios"
import StationCardView from "./stationCard"
import {v4 as uuidv4} from 'uuid';

const TrainView = () => {
    const [affolternTrain, setAffolternTrain] = useState({"station": {"name": "Name"}, "stationboard": []})
    const [zentenBus, setZentenBus] = useState({"station": {"name": "Name"}, "stationboard": []})
    const [fromInput, setFromInput] = useState("")
    const [toInput, setToInput] = useState("")

    useEffect(() => {
        fetchTrainsAffoltern();
        fetchBusZentenhausplatz();
    }, []);

    const fetchTrainsAffoltern = () => {
        trainAPI.get("stationboard?id=8503008&limit=10")
            .then(response => {
                setAffolternTrain(response.data)
            })
            .catch(error => console.log(error))
    };
    const fetchBusZentenhausplatz = () => {
        trainAPI.get("stationboard?id=8576262&limit=10")
            .then(response => {
                setZentenBus(response.data)
                console.log("")
            })
            .catch(error => console.log(error))
    };

    const fetchTrainStations = (trainstationInput) => {
        trainAPI.get("stationboard?id=8576262&limit=10")
            .then(response => {
                setZentenBus(response.data)
            })
            .catch(error => console.log(error))
    };

    const handleInputFrom = (e) =>{
        e.preventDefault()
        setFromInput(e.target.value)
        console.log(fromInput)
    }

    const handleInputTo= (e) =>{
        e.preventDefault()
        setFromInput(fromInput)
    }


    return (
        <div className="flex flex-col justify-center">
            <h1 className="font-bold  justify-center">
                Connections from Home
            </h1>
            <div>
                <label htmlFor={"from"}> From</label>
                <input type={"text"} id={"from"} value={fromInput} onChange={handleInputFrom}/>
                <label htmlFor={"to"}> To</label>
                <input type={"text"} id={"to"} value={fromInput} onChange={handleInputTo}/>
            </div>
            <div>
                <h2>
                    {affolternTrain.station.name}
                </h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {
                    affolternTrain.stationboard.map((transport) => {
                        return (
                            <div className="border border-indigo-600" key={uuidv4()}>
                                <StationCardView transport={transport}/>
                            </div>
                        )
                    })
                }
            </div>
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
    )
}

export default TrainView