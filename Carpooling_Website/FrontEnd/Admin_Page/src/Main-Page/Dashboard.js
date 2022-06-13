import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  SmallerDiv,
  SmallDiv,
  MediumDiv,
  CenterMediumDiv,
  LargeDiv,
  SmallerRightBox,
  SmallerLeftBox,
  SmallBox,
  MediumBox,
  CenterMediumBox,
  LargeBox,
  Image,
} from "../Styled-Components/MenuDivs";

//this hook saves what we did in a previous page
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Dashboard() {
  let navigate = useNavigate();

  const [totalRides, setTotalRides] = useState([]);
  const [ongoingRides, setOngoingRides] = useState([]);
  const [cancelledRides, setCancelledRides] = useState([]);
  const [completedRides, setCompletedRides] = useState([]);
  const [totalMonthyProfit, setTotalMonthlyProfit] = useState([]);
  const [totalRevenu, setTotalRevenu] = useState([]);
  const [totalDownloads, setTotalDownloads] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalVisitors, setTotalVisitors] = useState([]);
  const [overallAverage, setOverallAverage] = useState([]);

  useEffect(() => {
    let dataRetriever = [];
    const canLogin = async () => {
      await Axios.get("http://localhost:4000/dashboard", {}).then(
        (response) => {
          console.log("response >>> ", response.data);
          console.log("you arrived to this page");
          navigate(response.data);
        }
      );
    };
    canLogin();
    const fetchInfo = async () => {
      await Axios.get("http://localhost:4000/getData", {}).then((response) => {
        dataRetriever = response.data;
        setTotalRides({
          labels: dataRetriever.map((data) => data.Month),

          datasets: [
            {
              label: "Total Rides",
              data: dataRetriever.map((data) => data.TotalRides),
              backgroundColor: "#00b1ff",
            },
          ],
        });
        setOngoingRides({
          labels: dataRetriever.map((data) => data.Month),
          datasets: [
            {
              label: "Ongoing Rides",
              data: dataRetriever.map((data) => data.CancelledRides),
              backgroundColor: "#ffd950",
            },
          ],
        });
        setCancelledRides({
          labels: dataRetriever.map((data) => data.Month),
          datasets: [
            {
              label: "Cancelled Rides",
              data: dataRetriever.map((data) => data.CancelledRides),
              backgroundColor: "#b90000",
            },
          ],
        });
      });
      setCompletedRides({
        labels: dataRetriever.map((data) => data.Month),
        datasets: [
          {
            label: "Completed Rides",
            data: dataRetriever.map((data) => data.CompletedRides),
            backgroundColor: "#02bc77",
          },
        ],
      });
      setTotalMonthlyProfit({
        labels: dataRetriever.map((data) => data.Month),
        datasets: [
          {
            label: "Total Monthly Profit",
            data: dataRetriever.map((data) => data.TotalMonthyProfit),
            backgroundColor: "#00b1ff",
          },
        ],
      });
      setTotalRevenu({
        labels: dataRetriever.map((data) => data.Month),
        datasets: [
          {
            label: "Total Revenu",
            data: dataRetriever.map((data) => data.TotalRevenu),
            backgroundColor: "#ffd950",
          },
        ],
      });
      setTotalDownloads({
        labels: dataRetriever.map((data) => data.Month),
        datasets: [
          {
            label: "Total Downloads",
            data: dataRetriever.map((data) => data.TotalDownloads),
            backgroundColor: "#b90000",
          },
        ],
      });
      setTotalUsers({
        labels: dataRetriever.map((data) => data.Month),
        datasets: [
          {
            label: "Total Users",
            data: dataRetriever.map((data) => data.TotalUsers),
            backgroundColor: "#02bc77",
          },
        ],
      });
      setTotalVisitors({
        labels: dataRetriever.map((data) => data.Month),
        datasets: [
          {
            label: "Total Visitors",
            data: dataRetriever.map((data) => data.TotalVisitors),
            backgroundColor: ["#00b1ff", "#ffd950", "#b90000", "#02bc77"],
          },
        ],
      });
      setOverallAverage({
        labels: dataRetriever.map((data) => data.Month),
        datasets: [
          {
            type: "bar",
            label: "5 Stars",
            data: dataRetriever.map((data) => data.OverallRatings.FiveStars),
            backgroundColor: "#57e32c",
          },
          {
            type: "bar",
            label: "4 Stars",
            data: dataRetriever.map((data) => data.OverallRatings.FourStars),
            backgroundColor: "#b7dd29",
          },

          {
            type: "bar",
            label: "3 Stars",
            data: dataRetriever.map((data) => data.OverallRatings.ThreeStars),
            backgroundColor: "#ffe234",
          },
          {
            type: "bar",
            label: "2 Stars",
            data: dataRetriever.map((data) => data.OverallRatings.TwoStars),
            backgroundColor: "#ffa534",
          },

          {
            type: "bar",
            label: "1 Star",
            data: dataRetriever.map((data) => data.OverallRatings.OneStar),
            backgroundColor: "#ff4545",
          },
        ],
      });
    };
    fetchInfo();
  }, []);

  document.body.style.backgroundColor = "#000";

  return (
    <>
      <Sidebar />
      {/* This is the First Section of the page  */}
      <SmallerDiv>
        {/* Far Right Box */}
        <SmallerLeftBox>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <Image src={require("./Images/Completed_Rides.png")} />
        </SmallerLeftBox>
        <SmallerRightBox>
          <Line data={completedRides} />
        </SmallerRightBox>
      </SmallerDiv>
      {/* Right Box */}
      <SmallerDiv>
        <SmallerLeftBox>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <Image src={require("./Images/Cancelled_Rides.png")} />
        </SmallerLeftBox>
        <SmallerRightBox>
          <Line data={cancelledRides} />
        </SmallerRightBox>
      </SmallerDiv>
      {/* Left Box */}
      <SmallerDiv>
        <SmallerLeftBox>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <Image src={require("./Images/Ongoing_Rides.png")} />
        </SmallerLeftBox>
        <SmallerRightBox>
          <Line data={ongoingRides} />
        </SmallerRightBox>
      </SmallerDiv>
      {/* Far Left Box */}
      <SmallerDiv>
        <SmallerLeftBox>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <Image src={require("./Images/Total_Rides.png")} />
        </SmallerLeftBox>
        <SmallerRightBox>
          <Line data={totalRides} />
        </SmallerRightBox>
      </SmallerDiv>
      <br></br>

      {/* This is the Second Section of the page  */}
      {/* Far Right Box */}
      <SmallDiv>
        <SmallBox>
          <Line data={totalUsers} />
        </SmallBox>
      </SmallDiv>
      {/* Right Box */}
      <SmallDiv>
        <SmallBox>
          <Line data={totalDownloads} />
        </SmallBox>
      </SmallDiv>
      {/* Left Box */}
      <SmallDiv>
        <SmallBox>
          <Line data={totalRevenu} />
        </SmallBox>
      </SmallDiv>
      {/* Far Left Box */}
      <SmallDiv>
        <SmallBox>
          <Line data={totalMonthyProfit} />
        </SmallBox>
      </SmallDiv>

      <br></br>
      {/* This is the Third Section of the page  */}
      {/* Far Right Box */}
      <MediumDiv></MediumDiv>
      {/* Center Box */}
      <CenterMediumDiv>
        <CenterMediumBox>
          <Line data={totalUsers} />
        </CenterMediumBox>
      </CenterMediumDiv>
      {/* Far Left Box */}
      <MediumDiv>
        <MediumBox>
          <Doughnut data={totalVisitors} />
        </MediumBox>
      </MediumDiv>

      <br></br>
      {/* This is the Fourth Section of the page  */}
      <LargeDiv>
        <LargeBox>
          <Bar data={overallAverage} />
        </LargeBox>
      </LargeDiv>
    </>
  );
}

export default Dashboard;
