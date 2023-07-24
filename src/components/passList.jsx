const PassList = ({passList}) =>{
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