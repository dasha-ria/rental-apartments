import { GetServerSideProps } from "next";
import Link from "next/link";
import { Listbox } from "@headlessui/react";
import { useState } from "react";

const minRooms = [undefined, 1, 2, 3, 4];
const maxRooms = [undefined, 1, 2, 3, 4];

const sort = [undefined, "price-asc", "price-desc"];

function getSortLabelById(sortId) {
  if (sortId === "price-asc") {
    return "Low to high price";
  } else if (sortId === "price-desc") {
    return "High to low price";
  } else if (sortId === undefined) {
    return "No sorting";
  } else {
    throw new Error("Invalid sort ID");
  }
}

export default function Home({ apartments, search }) {
  const [selectedMinRooms, setSelectedMinRooms] = useState(
    search?.minRooms ?? minRooms[0]
  );
  const [selectedMaxRooms, setSelectedMaxRooms] = useState(
    search?.maxRooms ?? maxRooms[0]
  );
  const [selectedSort, setSelectedSort] = useState(sort[0]);

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
                  defaultValue={search.minPrice}
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
                  defaultValue={search.maxPrice}
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
                  defaultValue={search.minSize}
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
                  defaultValue={search.maxSize}
                ></input>
              </label>
            </div>
          </div>
          <div className="flex gap-6 pt-2 md:pt-0">
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
              <Listbox
                value={selectedMinRooms}
                onChange={setSelectedMinRooms}
                name="minRooms"
              >
                <label className="flex flex-col">
                  Min rooms
                  <Listbox.Button className="border border-black h-10 w-24 p-2 rounded-md">
                    {selectedMinRooms}
                  </Listbox.Button>
                </label>
                <Listbox.Options className="border border-black w-24 rounded-md pt-2 pb-2 mt-2 cursor-pointer">
                  {minRooms.map((room) => (
                    <Listbox.Option
                      className={({ active }) =>
                        `pl-11 pt-1 pb-1 ${
                          active ? "bg-gray-100 text-black" : "text-gray-900"
                        }`
                      }
                      key={room}
                      value={room}
                    >
                      {({ selected }) => (
                        <span className={selected ? "font-bold" : null}>
                          {room}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            <div className="flex flex-col">
              <Listbox
                value={selectedMaxRooms}
                onChange={setSelectedMaxRooms}
                name="maxRooms"
              >
                <label className="flex flex-col">
                  Max rooms
                  <Listbox.Button className="border border-black h-10 w-24 p-2 rounded-md">
                    {selectedMaxRooms}
                  </Listbox.Button>
                </label>
                <Listbox.Options className="border border-black w-24 rounded-md pt-2 pb-2 mt-2 cursor-pointer">
                  {maxRooms.map((room) => (
                    <Listbox.Option
                      className={({ active }) =>
                        `pl-11 pt-1 pb-1 ${
                          active ? "bg-gray-100 text-black" : "text-gray-900"
                        }`
                      }
                      key={room}
                      value={room}
                    >
                      {({ selected }) => (
                        <span className={selected ? "font-bold" : null}>
                          {room}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>
        </div>

        <Listbox value={selectedSort} onChange={setSelectedSort} name="sort">
          <label className="flex flex-col mt-2">
            Sort by
            <Listbox.Button className="border border-black h-10 w-48 p-2 rounded-md">
              {getSortLabelById(selectedSort)}
            </Listbox.Button>
          </label>
          <Listbox.Options className="border border-black w-48 rounded-md pt-2 pb-2 mt-2 cursor-pointer">
            {sort.map((item) => (
              <Listbox.Option
                className={({ active }) =>
                  `pl-8 pt-1 pb-1 ${
                    active ? "bg-gray-100 text-black" : "text-gray-900"
                  }`
                }
                key={item}
                value={item}
              >
                {({ selected }) => (
                  <span className={selected ? "font-bold" : null}>
                    {getSortLabelById(item)}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>

        <button
          className="border border-black pt-2 pb-2 pl-6 pr-6 rounded-md mt-6 hover:bg-gray-100"
          type="submit"
        >
          Filter
        </button>
      </form>

      <div className="pl-12 pt-4">
        <div className="flex flex-col"></div>
      </div>

      <div className="flex gap-12 flex-wrap pt-8 pl-12 w-full">
        {apartments.map((apartment) => (
          <Link key={apartment.id} href={`/apartment/${apartment.id}`}>
            <div className="flex flex-col gap-2 rounded-lg items-start">
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
    minPrice: query.minPrice ?? null,
    maxPrice: query.maxPrice ?? null,
    minSize: query.minArea ?? null,
    maxSize: query.maxArea ?? null,
    minRooms: query.minRooms ?? null,
    maxRooms: query.maxRooms ?? null,
    sort: query.sort ?? null,
  } as Record<string, string | null>;

  const searchParams = new URLSearchParams(search);
  const res = await fetch(
    "http://localhost:5050/apartments?" + searchParams.toString()
  );
  const apartments = await res.json();

  return {
    props: {
      apartments,
      search,
    },
  };
};
