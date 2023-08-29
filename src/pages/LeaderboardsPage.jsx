import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncPopulateLeaderboards } from "../states/leaderboards/action";

function LeaderboardsPage() {
  const leaderboards = useSelector((states) => states.leaderboards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  if (!leaderboards) return null;

  return (
    <section className="container mx-auto">
      <p className="text-5xl font-poppins font-semibold mb-2">Leaderboards</p>
      {leaderboards.map((user, index) => (
        <section className="flex p-2 justify-between">
          <section className="flex flex-1">
            <section
              className={`${
                index < 3 ? "bg-primary text-3xl font-bold" : "bg-gray-400"
              } font-poppins w-1/12 grid place-items-center rounded-lg`}
            >
              <p className="text-white">{index + 1}</p>
            </section>
            <section className="w-11/12 ml-4 bg-gray-100 p-2 rounded-lg flex">
              <img alt={user.user.name} src={user.user.avatar} className="rounded-lg mr-2"/>
              <section>
                <p className="font-semibold font-poppins">{user.user.name}</p>
                <p className="font-light text-gray-500">{user.user.email}</p>
              </section>
            </section>
          </section>
          <section className="w-14 grid place-items-center">
            <p>{user.score}</p>
          </section>
        </section>
      ))}
    </section>
  );
}

export default LeaderboardsPage;
