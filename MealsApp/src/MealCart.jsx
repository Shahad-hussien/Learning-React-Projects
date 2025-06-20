import { useEffect } from "react";
import useFetch from "./custom/useFetch";

const MealCart = ({ categoryToShowMeals }) => {
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryToShowMeals}`
  );

  useEffect(() => {}, [data, loading, error]);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.meals?.map((meal) => (
          <div
            key={meal.idMeal}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {meal.strMeal}
            </h2>
            <span className="text-sm text-gray-500">
              Meal ID: {meal.idMeal}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default MealCart;
