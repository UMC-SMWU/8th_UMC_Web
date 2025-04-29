import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const { data, isError, isLoading } = useGetLpList({
    search,
  });
  console.log(data?.data.map((lp) => lp.title));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (isError) {
    return <div>Error...</div>;
  }
  
  return (
    <div className="my-5">
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div>{data?.data.map((lp) => <h1>{lp.title}</h1>)}</div>
    </div>
  )
}

export default HomePage
