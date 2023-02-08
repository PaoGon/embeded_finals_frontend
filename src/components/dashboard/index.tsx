import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';

import Toogle from '../toogle';

const Dashboard: FC = () => {

  const get_bulb_state = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch("http://192.168.43.81/getSwitch.php", requestOptions);
    const data_res = await res.json();

    try {
      if (data_res.success === 1) {
        console.log(data_res);
        return data_res
      }
    }
    catch (err) {
      console.log(err);
    }
  }
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
        return data_res
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const {
    isLoading: bulbIsLoading,
    data: bulb
  } = useQuery({ queryKey: ['bulb'], queryFn: get_bulb_state });
  const {
    isLoading: fanIsLoading,
    data: fan
  } = useQuery({ queryKey: ['fan'], queryFn: get_fan_state });



  if (bulbIsLoading || fanIsLoading) return <div>loading..</div>
  return (

    <div className="App">
      <Toogle type={"slider-fan"} />
      <Toogle type={"slider-bulb"} />
    </div>
  )
}

export default Dashboard
