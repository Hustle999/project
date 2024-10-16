import React, { useState } from "react";

export const Tester = () => {
  // Initialize state with an empty object
  const [data, setData] = useState({});

  // Function to increment a specific counter
  const incrementCount = (countKey) => {
    setData((prevData) => ({
      ...prevData,
      [countKey]: (prevData[countKey] || 0) + 1, // Incrementing the specified count, defaulting to 0 if undefined
    }));
  };

  // Function to decrement a specific counter
  const decrementCount = (countKey) => {
    setData((prevData) => ({
      ...prevData,
      [countKey]: (prevData[countKey] || 0) - 1, // Decrementing the specified count
    }));
  };

  return (
    <div>
      {["count1", "count2", "count3"].map((countKey) => (
        <div key={countKey}>
          <h1>
            {countKey}: {data[countKey] || 0}
          </h1>
          <button onClick={() => incrementCount(countKey)}>
            Increment {countKey}
          </button>
          <button onClick={() => decrementCount(countKey)}>
            Decrement {countKey}
          </button>
        </div>
      ))}
    </div>
  );
};
