/* eslint-disable @next/next/no-img-element */
import React from "react";

// var count = 0;
// function activeClass(val) {
//     var totalElement=document.getElementById("1");
//     if (count > totalElement.length || count < 0) return;
//     var list=document.getElementsByClassName{"active"};
//     let elem;
//     if(val == 'next'){
//         elem = list[0].nextElementSibling;
//         count++;
//     }
//     else {
//         elem = list[0].previousElementSibling;
//         count--;
//     }
//     list[0].class
// }

function PopularChoices() {
    let choices = [
        {id: 1, name: "Nguyen Van A", src:"../public/vercel.svg"},
        {id: 2, name: "Nguyen Van B", src:"../public/vercel.svg"},
        {id: 3, name: "Nguyen Van C", src:"../public/vercel.svg"},
        {id: 4, name: "Nguyen Thi A", src:"../public/vercel.svg"},
        {id: 5, name: "Nguyen Thi B", src:"../public/vercel.svg"},
        {id: 6, name: "Nguyen Thi C", src:"../public/vercel.svg"},
    ]

    return(
        <div className="flex flex-wrap justify-around lg:mt-10 px-32">
            {choices.map((choices) => (
                <React.Fragment key={choices.id}>
                    <div className="hidden sm:inline-block flex-none w-52 group cursor-pointer mb-5 lg:inline-block w-80 flex-none group cursor-pointer mb-5">
                        <div className="h-24 w-24 lg:w-64 h-64 ">
                            <img
                            src={choices.src}
                            className="object-cover border rounded-md h-full w-full mix-blend-multiply lg:transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                            alt="category"
                            />
                        </div>
                        <div className="mt-2">
                            <h1 className="font-bold">{choices.name}</h1>
                        </div>
                    </div>
                    <div className="flex-initial mt-2 mb-2 sm:hidden">
                        <h1 className="rounded-full border py-1 px-2 mr-1 font-bold border-black hover:bg-gray-200 flex items-center justify-center text-center">
                        {choices.name}
                        </h1>
                    </div>
                </React.Fragment>
            ))}
            <button className="btn btn-default button-next" on-click="activeclass(-1)" type="button">Next</button>
            <button className="btn btn-default button-prev" on-click="activeclass(1)" type="button">Previous</button>
        </div>
    )
}

export default PopularChoices;