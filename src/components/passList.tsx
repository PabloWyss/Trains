import Section from "./section.jsx";
import React, {createRef, useState, useEffect, Component} from "react"

type PassListProps  = {
    passList: {
        arrival: string,
        location: {
            name: string
        }
    }
}

const PassList = ({passList}: PassListProps) => {
    console.log(passList)
    return(
        <div className="grid grid-cols-2 gap-">
            <p>Station</p>
            {passList.location.name}
            <p>Arrival at station</p>
            {passList.arrival}
        </div>
    )
}

export default PassList