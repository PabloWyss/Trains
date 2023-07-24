const StationCardView = ({transport}) =>{

    return(
        <div className="grid grid-cols-2 gap-">
            <p>Transport No.</p>
            {transport.category + transport.number}
            <p>direction</p>
            {transport.to}
            <p>departure</p>
            {transport.stop.departure.slice(11,19)}
            <p> delay </p>
            {transport.stop.delay}
            <p>platform</p>
            {transport.stop.platform}
        </div>
    )
}

export default StationCardView