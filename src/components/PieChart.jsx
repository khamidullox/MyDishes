import { useState, useEffect } from "react";
import { useCollection } from "../hooks/useCollection";
import { useSelector } from "react-redux";
import { GiSadCrab } from "react-icons/gi";
import { Link } from "react-router-dom";
//Chart
import ReactApexChart from "react-apexcharts";
function PieChart() {
  let { user } = useSelector((state) => state.user);
  let [pie, setPie] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  let { data } = useCollection("dishes", ["uid", "==", user.uid], ["createAt"]);
  useEffect(() => {
    if (data) {
      const nationsCount = data.reduce((acc, item) => {
        acc[item.nation] = (acc[item.nation] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(nationsCount);
      const series = Object.values(nationsCount);

      setPie({
        series,
        options: {
          chart: {
            width: 380,
            type: "pie",
          },
          labels,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      });
    }
  }, [data]);
  if (data) {
    if (data.length > 0) {
      return (
        <div className="md:ml-16">
          <div id="chart">
            <ReactApexChart
              options={pie.options}
              series={pie.series}
              type="pie"
              width={400}
            />
          </div>
          <div id="html-dist"></div>
          <h1 className=" md:pl-14 text-xl font-bold">The dish you choose</h1>
        </div>
      );
    }
    if (data.length == 0) {
      return (
        <div className="h-96 flex items-center justify-center gap-3  place-items-center font-bold  flex-col">
          <h1 className=" flex items-center opacity-60 justify-center gap-3 place-items-center  md:text-3xl text-xl ">
            Your list of dishes is empty
            <GiSadCrab />
          </h1>
          <Link
            className="link link-success  md:text-3xl text-xl "
            to="/create"
          >
            Create now
          </Link>
        </div>
      );
    }
  } else {
    return (
      <div className=" max-h-xl h-52 flex items-center justify-center ">
        <span className="loading loading-bars loading-lg  "></span>
      </div>
    );
  }
}

export default PieChart;
