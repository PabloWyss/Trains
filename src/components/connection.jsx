import Section from "./section.jsx";

const Connection = ({connection}) =>{
    return(
        <div className="grid grid-cols-2 gap-">
            <p>Duration</p>
            <p>{connection.duration}</p>
            <p>transfers</p>
            <p>{connection.transfers}</p>
            {connection.sections.map((section)=>{
                return(
                    <Section section={section}/>
                )
            })}

        </div>
    )
}

export default Connection