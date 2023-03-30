import { GetServerSideProps } from "next";

export default function Apartment({ apartment }) {
  const hotWater = (e) => {
    if (e.hot_water_included === "true") {
      return "Included";
    } else {
      return "Not included";
    }
  };

  const elevator = (e) => {
    if (e.has_elevator === "true") {
      return "Yes";
    } else {
      return "No";
    }
  };

  return (
    <>
      {/* <pre>{JSON.stringify(apartment, null, 2)}</pre> */}

      <img src="../logo.svg" className="h-10 w-auto pl-12 mt-8 mb-8"></img>

      <img
        src={apartment.image}
        className="ml-12 w-pic h-pic object-cover rounded-md"
      ></img>
      <div className="pl-12 pt-2">
        <p className="font-medium">{`${apartment.address}, Malmö`}</p>
        <div className="flex flex-row gap-2 items-center">
          <p>{`${apartment.price} kr`}</p>
          <div className="w-half h-half rounded-lg bg-black"></div>
          <p>{`${apartment.rooms} rooms`}</p>
          <div className="w-half h-half rounded-lg bg-black"></div>
          <p>{`${apartment.area} sqm`}</p>
        </div>

        <div className="w-96 h-thin bg-gray-200 mt-2 mb-2"></div>

        <p>Move-in date: {apartment.move_in_date}</p>
        <p>Landlord: {apartment.landlord}</p>
        <p>Apartment type: {apartment.type}</p>

        <div className="w-96 h-thin bg-gray-200 mt-2 mb-2"></div>

        <p>Hot water: {hotWater(apartment)}</p>
        <p>Elevator: {elevator(apartment)}</p>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch("http://localhost:5050/apartments/" + params.id);
  const apartment = await res.json();

  return {
    props: {
      apartment: apartment,
    },
  };
};
