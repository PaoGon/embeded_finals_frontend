import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';



const CustomBarChart: FC = () => {
  const [modData, setModData] = useState([{}]);

  const getRecentDaily = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      "http://192.168.43.81/getRecentDaily.php",
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

  const { data: day, isLoading: recentDayLoading } = useQuery({
    queryKey: ["recentDay"],
    queryFn: getRecentDaily,
  });

  const getAllHours = async (helloi: string) => {
    console.log(helloi);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `http://192.168.43.81/getAllHours.php?daily_id=${helloi}`,
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
  const { data: hours, isLoading: hoursLoading } = useQuery({
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["hours", day?.message[0].daily_id],
    queryFn: () => getAllHours(day?.message[0].daily_id),
    onSuccess: (data) => {
      setModData([
        ...data.message
      ])
      console.log(data?.message[0])
    }
  });


  const getLatestHour = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      "http://192.168.43.81/getBarData.php",
      requestOptions
    );
    const data_res = await res.json();

    try {
      if (data_res) {
        console.log("test");
        const newData = JSON.parse(data_res.data);
        return newData;
      }
      console.log("dd");
      //return newData;
    } catch (err) {
      console.log(err);
    }
  };

  const { data: currHour, isLoading: currHourLoad } = useQuery({
    queryKey: ["currHour"],
    queryFn: getLatestHour,
    refetchInterval: 1000,
    onSuccess: (data) => {
      const ss = [data];
      setModData([
        ...hours?.message, ...ss
      ])
    }
  });
  useEffect(() => {
    console.log(modData);
  }, [modData]);


  if (recentDayLoading || currHourLoad) return <div>loading..</div>

  return (
    <>

      <div className="consumption-cost-wrapper">
        <div className="wrapper-consumption">
          <p className="hourlyConsumption"> Current Consumption per Hour</p>
          <p className="hourlyConsumption-data">{currHour.total_curr} kWh</p>
        </div>
        <div className="wrapper-cost">
          <p className="cost"> Total Cost per Hour</p>
          <p className="cost-data"> PHP {currHour.total_bill} </p>
        </div>

      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={modData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hourly" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="data" fill="#6cd6ff" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
export default CustomBarChart;
