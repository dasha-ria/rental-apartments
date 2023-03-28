import { GetServerSideProps } from "next";

export default function Home({ apartments }) {
  return (
    <>
      {/* <pre>{JSON.stringify(apartments, null, 2)}</pre> */}

      {apartments.map((apartment) => (
        <div key={apartment.id} className="flex flex-col">
          <div>
            <p>{apartment.address}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p>{apartment.rooms}</p>
            <p>{apartment.area}</p>
            <p>{apartment.price}</p>
          </div>
        </div>
      ))}
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
