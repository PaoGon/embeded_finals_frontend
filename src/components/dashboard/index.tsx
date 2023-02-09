import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";

import Cards from "../cards";

import { ImPower } from "react-icons/im";
import { FaMoneyBillWave } from "react-icons/fa";

import Toogle from "../toogle";

import "./styles.css";
import CustomBarChart from "../BarChart";

const Dashboard: FC = () => {
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
        console.log(data_res);
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
        console.log(data_res);
        return data_res;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { isLoading: bulbIsLoading, data: bulb } = useQuery({
    queryKey: ["bulb"],
    queryFn: get_bulb_state,
  });
  const { isLoading: fanIsLoading, data: fan } = useQuery({
    queryKey: ["fan"],
    queryFn: get_fan_state,
  });

  // if (bulbIsLoading || fanIsLoading) return <div>loading..</div>;
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
            <Toogle type={"slider-fan"} />
            <Toogle type={"slider-bulb"} />
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
