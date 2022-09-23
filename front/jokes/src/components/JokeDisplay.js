import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../api/useApi";
import FadeTransition from "./FadeTransition/FadeTransition";
import styles from "./JokeDisplay.module.css"


export function SingleJokeDisplay() {
  const [res, setRes] = useState(null);
  const api = useApi();

  const { pk } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getJoke(pk);
        setRes(response);
      } catch {
        setRes("Something went wrong");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pk]);
  const nodeRef = useRef(null);
  let text;
  if (!res) text = "Loading";
  else text = res.body.replace(/\{|\}/g, ``);

  return (
    <FadeTransition nodeRef={nodeRef} duration={300}>
      <div ref={nodeRef} className={`${styles.joke_container}`}>
        <div className={`${styles.single_joke_item}`}>
          {text}
        </div>
      </div>
    </FadeTransition>
  );
}

export function JokeDisplay() {
  const [res, setRes] = useState([]);
  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.listJokes();
        setRes(response.results);
      } catch {
        setRes("Something went wrong");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = res.map(data => {
    return <Link className={`${styles.joke_item}`} to={`${data.pk}`} key={data.pk} >
      {/* <div className={`${styles.joke_item}`}> */}
        {data.body.replace(/\{|\}/g, ``)}
      {/* </div> */}
    </Link>
  })

  return (
    <div className={`${styles.joke_container}`}>
      {items}
    </div>
  );
}