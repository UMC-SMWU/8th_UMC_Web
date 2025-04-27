import useGetLps from "../hooks/queries/useGetLps";

export default function HomePage() {
  const { data } = useGetLps({search: "타입"});
  console.log(data);

  return (
    <div className="flex h-full flex-col text-2xl text-white">
      <div className="text-2xl text-white">
        {data?.data.data.map((lp) => {
          return (
            <div key={lp.id} className="flex flex-col">
              <h1>{lp.title}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
