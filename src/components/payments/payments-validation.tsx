import React from "react";
import { useMoralis } from "react-moralis";

export default function payments(props: any) {
  const { Moralis } = useMoralis();

  const [request, setRequest] = React.useState(false);
  const [validation, setValidation] = React.useState(false);

  if (!request) {
    setRequest(true);
    Moralis.Cloud.run("isTDCAdmin")
      .then((data: any) => {
        if (!data && props.failed) {
          props.failed();
          return;
        }
        setValidation(data);
      })
      .catch((error: any) => {
        return error;
      });
  }

  return validation ? props.children : null;
}
