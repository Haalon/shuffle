import { useContext, useState } from "react";
import { useApi } from "../api/useApi";
import "./Login.css";

export default function Submit() {
    const api = useApi();
    const [response, setResponse] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        let res;
        const body = e.target.body.value;
        const use_as_source = e.target.source.checked;
        const use_as_destination = e.target.destination.checked;
        try {
            await api.createJoke({body, use_as_source, use_as_destination});
            e.target.body.value = "";
            e.target.source.checked = true;
            e.target.destination.checked = true;
        } catch (error) {
            setResponse(error?.response?.data);
            return false;
        }    
    };

    return (
        <div className="w100 h100">
            <form onSubmit={handleSubmit} className="flex-column submit-form">
                <h3 className="">Submit Joke </h3>

                <label htmlFor="body">Body</label>
                <textarea className="w100" type="text" id="body" placeholder="Joke with a {highlighted punchline}." />
                <span style={{ color: "red"}} >{response["body"]}</span>

                <div className="flex-row flex-space-between">
                    <label htmlFor="source">Use as punchline Source</label>
                    <input className="" type="checkbox" id="source" defaultChecked={true}/>
                </div>
                <span style={{ color: "red"}} >{response["source"]}</span>

                <div className="flex-row flex-space-between">
                    <label htmlFor="destination">Use as punchline Destination</label>
                    <input className="" type="checkbox" id="destination" defaultChecked={true}/>
                </div>
                <span style={{ color: "red"}} >{response["destination"]}</span>

                {/* <div className="flex-fill"></div> */}
                <button className="w100" type="submit">Submit</button>
                
            </form>
        </div>
    );
};

