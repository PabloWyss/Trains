const StationCardView = ({transport}) =>{

    return(
        <div className="w-full flex flex-row gap-4">
            <div>
                <p>Transport No.</p>
                <p>direction</p>
                <p>departure</p>
                <p> delay </p>
                <p>platform</p>
            </div>
            <div>
                <p>{transport.category + transport.number}</p>
                <p>{transport.to}</p>
                <p>{transport.stop.departure.slice(11,19)}</p>
                <p>{transport.stop.delay}</p>
                <p>{transport.stop.platform}</p>
            </div>









        </div>
    )
}

export default StationCardView