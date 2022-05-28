import React from "react";

function PopularChoices() {
    let choices = [
        {id: 1, name: "aa"},
        {id: 2, name: "bb"},
        {id: 3, name: "cc"},
        {id: 4, name: "dd"},
        {id: 5, name: "ee"},
        {id: 6, name: "ff"},
    ]
    const sliderButton = {
        if (choices)
    }
    return(
        <div className="flex flex-wrap justify-around lg:mt-10 px-32">
            {choices.map((choices) => (
                <React.Fragment key={choices.id}>

                </React.Fragment>
            ))}
        </div>
    )
}

export default PopularChoices;