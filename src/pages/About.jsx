import { useSelector } from "react-redux";
import FromSelect from "../components/FromSelect";
import PieChart from "../components/PieChart";

function About() {
  let user = useSelector((state) => state.user.user);
  let lastLoginAt = user.createdAt;
  const lastLoginDate = new Date(parseInt(lastLoginAt));
  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(parseInt(timestamp));
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return date.toLocaleString(undefined, options);
  };

  const formattedDate = formatDate(user.createdAt);
  const datePart = formattedDate.split(",")[0];
  const timePart = formattedDate.split(",")[1];

  if (user) {
    return (
      <div className="aligen-content my-10 pb-10 flex gap-5 items-start justify-center md:flex-row flex-col ">
        <div className="">
          <img
            className="size-52 rounded-full md:ml-24 md:mt-12 lg:m-0"
            src={user.photoURL}
            alt=""
          />
        </div>
        <div className="pt-10 flex flex-col gap-3 items-center justify-center ">
          <div className="stats shadow max-w-xl lg:flex-row flex-col flex glass">
            <div className="stat ">
              <div className="stat-figure text-primary"></div>
              <div className="stat-title">Name</div>
              <div className="stat-value text-primary">{user.displayName}</div>
              <div className="stat-desc  font-bold text-xs pt-2">
                Email: {user.email}
              </div>
            </div>
            <div className="stat  ">
              <div className="stat-figure text-secondary"></div>
              <div className="stat-title">Create at acount</div>

              <div className="stat-value text-secondary">{datePart}</div>
              <div className="stat-desc text-xs font-bold pt-2">
                Time: {timePart}
              </div>
            </div>{" "}
          </div>
          <PieChart />
        </div>
      </div>
    );
  }
}

export default About;
