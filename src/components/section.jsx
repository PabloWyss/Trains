import PassList from "./passList.tsx";

const Section = ({section}) =>{
    console.log(section)
    return(
        <div className="grid grid-cols-2 gap-">
            <p>Departure Time</p>
            <p>{section.departure.departure}</p>
            <p>Platform</p>
            <p>{section.departure.platform}</p>
            <p>Delay</p>
            <p>{section.departure.delay}</p>
            {
                section.journey.passList.map( (passList) => {
                    return (
                        <PassList passList={passList}/>
                    )
                })
            }

        </div>
    )
}

export default Section