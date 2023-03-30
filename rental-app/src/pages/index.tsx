import { GetServerSideProps } from "next";
import Link from "next/link";

export default function Home({ apartments }) {
  return (
    <>
      {/* <pre>{JSON.stringify(apartments, null, 2)}</pre> */}

      <img src="logo.svg" className="h-10 w-auto pl-12 mt-8"></img>

      <div className="flex gap-12 flex-wrap pt-8 justify-center items-center w-full">
        {apartments.map((apartment) => (
          <Link key={apartment.id} href={`/apartment/${apartment.id}`}>
            <div className="p-4 flex flex-col gap-2 rounded-lg items-start hover:text-gray-600">
              <div>
                <img
                  src={apartment.image}
                  className="w-80 h-80 object-cover rounded-md"
                ></img>
              </div>
              <div>
                <p className="font-medium">{`${apartment.address}, Malmö`}</p>
                <div className="flex flex-row gap-2 items-center">
                  <p>{`${apartment.rooms} rooms`}</p>
                  <div className="w-half h-half rounded-lg bg-black"></div>
                  <p>{`${apartment.area} sqm`}</p>
                  <div className="w-half h-half rounded-lg bg-black"></div>
                  <p>{`${apartment.price} kr`}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await fetch("http://localhost:5050/apartments");
  const apartments = await res.json();

  return {
    props: {
      apartments: apartments,
    },
  };
};
