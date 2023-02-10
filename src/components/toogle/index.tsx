import {  FC, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IToogle } from './models';

import './styles.css';


const Toogle: FC<IToogle> = ({ type, state }) => {
  const [on, setOn] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const post_signal = async (data: any) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      //cache: "no-cache"
    };

    try {
      const res = await fetch("http://192.168.43.81/action.php", requestOptions)
      const response = await res.json()
      if (response.success == 1)  return response; 
    } catch (err) {
      console.log(err)
    };


  };

  const {mutate} = useMutation({
    mutationFn: (hello:any) => {
      return post_signal(hello);
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey: [type.split("-")[1]]})
    }
  })

  const getData = () => {
    mutate({
        led1: !on,
        type: type.split("-")[1]
      })
    setOn(!on)
  };


  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={state}
        onChange={getData}
      />
      <span className={type}></span>
      <span className="text on">On</span>
      <span className="text off">Off</span>
    </label>
  )
}

export default Toogle;
