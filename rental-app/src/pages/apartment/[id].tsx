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

      <img src="../bosydlig.svg" className="h-10 w-auto pl-12 mt-8 mb-12"></img>

      <a href="../">
        <button className="ml-12 mb-4 pt-2 pb-2 pl-4 pr-4 border border-black rounded-lg hover:bg-gray-100">
          Back to home
        </button>
      </a>

      <div className="flex flex-row items-start">
        <div>
          <img
            src={apartment.image}
            className="ml-12 w-pic h-pic object-cover rounded-md"
          ></img>
        </div>
        <div className="pl-12">
          <p className="font-medium text-lg">{`${apartment.address}, Malmö`}</p>
          <div className="flex flex-row gap-2 items-center">
            <p>{`${apartment.price} kr`}</p>
            <div className="w-half h-half rounded-lg bg-black"></div>
            <p>{`${apartment.rooms} rooms`}</p>
            <div className="w-half h-half rounded-lg bg-black"></div>
            <p>{`${apartment.area} sqm`}</p>
          </div>

          <div className="w-96 h-thin bg-gray-200 mt-2 mb-2"></div>

          <p className="font-medium">
            Elevator: <span className="font-normal">{elevator(apartment)}</span>
          </p>
          <p className="font-medium">
            Hot water:{" "}
            <span className="font-normal">{hotWater(apartment)}</span>
          </p>
          <p className="font-medium">
            Move-in date:{" "}
            <span className="font-normal">{apartment.move_in_date}</span>
          </p>

          <div className="w-96 h-thin bg-gray-200 mt-2 mb-2"></div>
          <p className="font-medium">
            Landlord: <span className="font-normal">{apartment.landlord}</span>
          </p>
          <p className="font-medium">
            Apartment type:{" "}
            <span className="font-normal">{apartment.type}</span>
          </p>
        </div>
      </div>

      <h3 className="ml-12 mt-4 text-lg font-semibold">Apply now!</h3>
      <form autoComplete="off" id="form" className="ml-12">
        <div className="flex gap-24">
          <div className="flex flex-col">
            <label for="firstname">First name</label>
            <input
              type="text"
              className="border border-black w-48"
              name="firstname"
              id="firstname"
            ></input>
          </div>
          <div className="flex flex-col">
            <label for="lastname">Last name</label>
            <input
              type="text"
              className="border border-black w-48"
              name="lastname"
              id="lastname"
            ></input>
          </div>
        </div>
        <div className="flex gap-24">
          <div className="flex flex-col">
            <label for="email">Email address</label>
            <input
              type="email"
              className="border border-black w-48"
              name="email"
              id="email"
            ></input>
          </div>
          <div className="flex flex-col">
            <label for="phone">Phone number</label>
            <input
              type="number"
              className="border border-black w-48"
              name="phone"
              id="phone"
            ></input>
          </div>
        </div>
        <div className="flex flex-col">
          <label for="message">Message</label>
          <textarea
            className="border border-black w-96"
            name="message"
            id="message"
          ></textarea>
        </div>
      </form>
      <button
        className="ml-12 mt-4 mb-8 pt-2 pb-2 pl-4 pr-4 border border-black rounded-lg hover:bg-gray-100"
        type="submit"
        form="form"
        value="Send"
      >
        Send
      </button>
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
