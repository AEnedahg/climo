import React from 'react'


const specificDate = new Date();

const formattedDate = specificDate.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function Day() {
  return (
    <div>
      <h1 className="text-white text-4xl mt-8">
        {
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ][new Date().getDay()]
        }
      </h1>
      <p className='text-white mt-2'>{formattedDate}</p>
    </div>
  );
}

export default Day