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
        className="ml-12 w-96 h-96 object-cover rounded-md"
      ></img>
      <p>{`${apartment.address}, Malmö`}</p>
      <p>{`${apartment.price} kr`}</p>
      <p>{`${apartment.rooms} rooms`}</p>
      <p>{`${apartment.area} sqm`}</p>

      <p>Move-in date: {apartment.move_in_date}</p>
      <p>Landlord: {apartment.landlord}</p>
      <p>Apartment type: {apartment.type}</p>

      <p>Hot water: {hotWater(apartment)}</p>
      <p>Elevator: {elevator(apartment)}</p>
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
