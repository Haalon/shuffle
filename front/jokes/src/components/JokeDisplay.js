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
  const [page, setPage] = useState(null);
  const [oldCount, setOldCount] = useState(0);
  const api = useApi();
  let itemsRefs = useRef([]);
  itemsRefs.current = res.map((element, i) => itemsRefs.current[i] ?? React.createRef());

  const loadData = async () => {
    const response = await api.listJokes(page);
    setOldCount(res.length);
    setRes([...res, ...response.results]);
    const newPage = response.next ? (new URL(response.next)).searchParams.get('page') : null;
    setPage(newPage);
  }
  
  useEffect(() => {
    loadData();
  }, []);

  const items = res.map((data, i) => {
    return <FadeTransition nodeRef={itemsRefs.current[i]} duration={300} delay={(i - oldCount)*30} key={data.pk} transform='scale(1.5)'>
      <Link className={`${styles.joke_item}`} ref={itemsRefs.current[i]} to={`${data.pk}`}  >
        {data.body.replace(/\{|\}/g, ``)}
      </Link>
    </FadeTransition>
  })

  const nextDiv = page ? <div className={styles.next_button} onClick={e => loadData(e)}>
    +
  </div> : null;

  return (
    <div className={`${styles.joke_container}`}>
      {items}
      {nextDiv}
    </div>
  );
}