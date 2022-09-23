import React from "react";
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
  let itemsRefs = useRef([]);
  itemsRefs.current = res.map((element, i) => itemsRefs.current[i] ?? React.createRef());

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
  }, []);

  const items = res.map((data, i) => {
    return <FadeTransition nodeRef={itemsRefs.current[i]} duration={300} delay={i*30} key={data.pk} transform='scale(1.5)'>
      <Link className={`${styles.joke_item}`} ref={itemsRefs.current[i]} to={`${data.pk}`}  >
        {data.body.replace(/\{|\}/g, ``)}
      </Link>
    </FadeTransition>
  })

  return (
    <div className={`${styles.joke_container}`}>
      {items}
    </div>
  );
}