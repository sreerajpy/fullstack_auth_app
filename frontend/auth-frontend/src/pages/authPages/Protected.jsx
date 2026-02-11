import React, { useEffect, useState } from "react";
import instance from "../../api/axios";

const Protected = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const res = await instance.get("/users/me");
        setData(JSON.stringify(res.data));
      } catch (err) {
        console.log(err);
        setData("Unauthorized");
      }
    };
    fetchProtected();
  }, []);

  return <div className="p-4">{data}</div>;
};

export default Protected;
