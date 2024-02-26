import React from "react";
import { useParams } from "react-router-dom";
import { Digimon } from "../type/digimon";
import axios from "axios";

export const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = React.useState<Digimon | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios
        .get<Digimon>(`${process.env.REACT_APP_DIGIMON_API}/v1/digimon/${id}`)
        .then((response) => {
          setDetail(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [id]);

  return isLoading ? (
    <div>loading...</div>
  ) : detail ? (
    <div>
      <div>{detail?.name}</div>
      <div>{detail?.descriptions?.[0]?.description}</div>
    </div>
  ) : (
    <div>nothing to show</div>
  );
};
