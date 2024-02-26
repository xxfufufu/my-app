import axios from "axios";
import React from "react";
import { Digimon } from "../type/digimon";
import { useNavigate } from "react-router-dom";

interface DigimonResponse {
  content: Digimon[];
  pageable: any;
}

export const List = () => {
  const navigate = useNavigate();
  const [digimon, setDigimon] = React.useState<DigimonResponse | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get<DigimonResponse>(
        `${process.env.REACT_APP_DIGIMON_API}/v1/digimon?pageSize=10`
      )
      .then((response) => {
        setDigimon(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <div>loading...</div>
  ) : digimon && digimon.content.length > 0 ? (
    <div>
      {digimon.content.map((d, i) => (
        <div
          onClick={() => navigate(`/digimon/${d.name}`)}
          key={i}
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            margin: "10px 0",
            cursor: "pointer",
          }}
        >
          <img
            src={d.image}
            alt={d.name}
            style={{ height: "100px", width: "100px", objectFit: "cover" }}
          />
          <div>{d.name}</div>
        </div>
      ))}
    </div>
  ) : (
    <div>nothing to show</div>
  );
};
