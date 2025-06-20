import useFetch from "./custom/useFetch";
import { useState } from "react";
import MealCart from "./MealCart";

const Meals = () => {
  const { data, loading, error } = useFetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
  );
  const [category, setCategory] = useState("");

  const resetSelection = () => {
    setCategory("");
  };

  return (
    <>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/80 z-10">
          <div className="p-6 bg-white rounded-lg shadow-lg text-gray-700 text-lg font-medium">
            Loading...
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/80 z-10">
          <div className="p-6 bg-red-100 border border-red-300 text-red-800 rounded-lg shadow">
            Error: {error}
          </div>
        </div>
      )}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Current Category:{" "}
          <span className="text-blue-600">{category || "None"}</span>
        </h1>

        <div className="flex gap-5 justify-center items-center mb-10">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-64 p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select a category
            </option>
            {data?.meals?.map((strCat) => (
              <option key={strCat.strCategory} value={strCat.strCategory}>
                {strCat.strCategory}
              </option>
            ))}
          </select>

          <button
            onClick={resetSelection}
            className="bg-red-500 px-4 py-2 text-white rounded hove:bg-red-700 transition duration-200"
          >
            Reset
          </button>
        </div>
        <div className="w-full max-w-6xl">
          <MealCart categoryToShowMeals={category} />
        </div>
      </div>
    </>
  );
};

export default Meals;
