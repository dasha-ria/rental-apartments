import { GetServerSideProps } from "next";
import Link from "next/link";
import { Listbox } from "@headlessui/react";
import { useState } from "react";

export default function Home({ apartments }) {
  const minRooms = [
    { id: 1, num: 1 },
    { id: 2, num: 2 },
    { id: 3, num: 3 },
    { id: 4, num: 4 },
  ];

  const maxRooms = [
    { id: 1, num: 1 },
    { id: 2, num: 2 },
    { id: 3, num: 3 },
    { id: 4, num: 4 },
  ];

  const [selectedMinRooms, setSelectedMinRooms] = useState(minRooms[0]);
  const [selectedMaxRooms, setSelectedMaxRooms] = useState(maxRooms[0]);

  return (
    <>
      {/* <pre>{JSON.stringify(apartments, null, 2)}</pre> */}

      <Link href="/">
        <img
          src="bosydlig.svg"
          className="h-10 w-auto pl-12 mt-8 max-w-4xl"
        ></img>
      </Link>

      <form className="pl-12 pt-12" autoComplete="off">
        <div className="flex gap-x-16 gap-y-2 flex-wrap">
          <div className="flex gap-6">
            <div className="flex flex-col">
              <label className="flex flex-col">
                Min price
                <input
                  className="border border-black focus:outline-none focus:border-focusBorder h-10 w-36 p-2 rounded-md"
                  name="minPrice"
                  type="number"
                ></input>
              </label>
            </div>
            <div className="flex flex-col">
              <label className="flex flex-col">
                Max price
                <input
                  className="border border-black focus:outline-none focus:border-focusBorder h-10 w-36 p-2 rounded-md"
                  name="maxPrice"
                  type="number"
                ></input>
              </label>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col">
              <label className="flex flex-col">
                Min size
                <input
                  className="border border-black focus:outline-none focus:border-focusBorder h-10 w-36 p-2 rounded-md"
                  name="minSize"
                  type="number"
                ></input>
              </label>
            </div>
            <div className="flex flex-col">
              <label className="flex flex-col">
                Max size
                <input
                  className="border border-black focus:outline-none focus:border-focusBorder h-10 w-36 p-2 rounded-md"
                  name="maxSize"
                  type="number"
                ></input>
              </label>
            </div>
          </div>
          <div className="flex gap-6 pt-2">
            {/* <div className="flex flex-col">
              <label className="flex flex-col">
                Min rooms
                <input
                  className="border border-black focus:outline-none focus:border-focusBorder h-10 w-36 p-2 rounded-md"
                  name="minRooms"
                  type="number"
                ></input>
              </label>
            </div>
            <div className="flex flex-col">
              <label className="flex flex-col">
                Max rooms
                <input
                  className="border border-black focus:outline-none focus:border-focusBorder h-10 w-36 p-2 rounded-md"
                  name="maxRooms"
                  type="number"
                ></input>
              </label>
            </div> */}
            <div className="flex flex-col">
              <Listbox value={selectedMinRooms} onChange={setSelectedMinRooms}>
                <Listbox.Button>{selectedMinRooms.num}</Listbox.Button>
                <Listbox.Options>
                  {minRooms.map((room) => (
                    <Listbox.Option key={room.id} value={room}>
                      {room.num}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            <div className="flex flex-col">
              <Listbox value={selectedMaxRooms} onChange={setSelectedMaxRooms}>
                <Listbox.Button>{selectedMaxRooms.num}</Listbox.Button>
                <Listbox.Options>
                  {maxRooms.map((room) => (
                    <Listbox.Option key={room.id} value={room}>
                      {room.num}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>
        </div>

        <button
          className="border border-black pt-2 pb-2 pl-6 pr-6 rounded-md mt-6 hover:bg-gray-100"
          type="submit"
        >
          Filter
        </button>
      </form>

      <div className="flex gap-12 flex-wrap pt-8 justify-center items-center w-full">
        {apartments.map((apartment) => (
          <Link key={apartment.id} href={`/apartment/${apartment.id}`}>
            <div className="p-4 flex flex-col gap-2 rounded-lg items-start">
              <div className="relative">
                <div>
                  <img
                    src={apartment.image}
                    className="w-80 h-80 object-cover rounded-md"
                  ></img>
                </div>
                {apartment.type !== "regular" && (
                  <div className="absolute top-4 right-8">
                    <div className="rounded-md w-24 h-8 bg-white/80 flex justify-center items-center">
                      <p>{apartment.type}</p>
                    </div>
                  </div>
                )}
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

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  const search = {
    minPrice: query.minPrice as string,
    maxPrice: query.maxPrice as string,
    minSize: query.minArea as string,
    maxSize: query.maxArea as string,
    minRooms: query.minRooms as string,
    maxRooms: query.maxRooms as string,
  };

  const searchParams = new URLSearchParams(search);
  const res = await fetch(
    "http://localhost:5050/apartments?" + searchParams.toString()
  );
  const apartments = await res.json();

  return {
    props: {
      apartments: apartments,
    },
  };
};
