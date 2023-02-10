import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";

import Cards from "../cards";

import { ImPower } from "react-icons/im";
import { FaMoneyBillWave } from "react-icons/fa";

import Toogle from "../toogle";

import "./styles.css";
import CustomBarChart from "../BarChart";

const Dashboard: FC = () => {
  const [fanState, setFanState] = useState<boolean>();
  const [bulbState, setBulbState] = useState<boolean>();

  const get_bulb_state = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      "http://192.168.43.81/getSwitch.php",
      requestOptions
    );
    const data_res = await res.json();

    try {
      if (data_res.success === 1) {
        return data_res;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const get_fan_state = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch("http://192.168.43.81/getFan.php", requestOptions);
    const data_res = await res.json();

    try {
      if (data_res.success === 1) {
        return data_res;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { isLoading: bulbIsLoading } = useQuery({
    refetchIntervalInBackground: true,
    refetchInterval: 1000,
    queryKey: ["bulb"],
    queryFn: get_bulb_state,
    onSuccess(data) {
      const res = JSON.parse(data.data);
      setBulbState(res.led1);
    },
  });

  const { isLoading: fanIsLoading } = useQuery({
    refetchIntervalInBackground: true,
    refetchInterval: 1000,
    queryKey: ["fan"],
    queryFn: get_fan_state,
    onSuccess(data) {
      const res = JSON.parse(data.data);
      setFanState(res.led1);
    },
  });

  if (bulbIsLoading || fanIsLoading) return <div>loading..</div>;

  return (
    <div className="main-container">
      <div className="header-flex">
        <div className="header">
          <Cards
            title="Power Consumption Daily"
            titleVal="18"
            kph=" kW/h"
            icons={<ImPower />}
            bgIcons={"redBg"}
          />
          <Cards
            title="Cost Consumption Daily"
            peso="&#8369;"
            titleVal={"18"}
            icons={<FaMoneyBillWave />}
            bgIcons={"kowloonBg"}
          />
          <Cards
            title="Power Consumption Monthly"
            titleVal="18"
            kph=" kW/h"
            icons={<ImPower />}
            bgIcons={"redBg"}
          />
          <Cards
            title="Cost Consumption Monthly"
            peso="&#8369;"
            titleVal="18"
            icons={<FaMoneyBillWave />}
            bgIcons={"kowloonBg"}
          />
        </div>
        <div className="btn-container">
          <div className="btn">
            <Toogle type={"slider-fan"} state={fanState} />
            <Toogle type={"slider-bulb"} state={bulbState} />
          </div>
        </div>
      </div>
      <div className="content">
        <div className="flex-col">
          <p className="chart-title">DAILY POWER CONSUMPTION</p>
          <CustomBarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
