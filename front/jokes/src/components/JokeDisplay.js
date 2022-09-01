import { useEffect, useState } from "react";
import { useApi } from "../api/useApi";

export default function JokeDisplay() {
    const [res, setRes] = useState("");
    const api = useApi();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.listJokes();
          setRes(JSON.stringify(response.results));
        } catch {
          setRes("Something went wrong");
        }
      };
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return (
      <div>
        <h1>Projected Page</h1>
        <p>{res}</p>
      </div>
    );
  }