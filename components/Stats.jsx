"use client";

import { useState, useEffect } from "react"; // 1. Import hooks
import CountUp from "react-countup";

// 2. Define the initial state (LeetCode starts at 0)
const initialStats = [
  {
    num: 0, // This will be updated by our fetch
    title: "LeetCode Problems",
  },
  {
    num: 186,
    title: "GeeksforGeeks Problems",
  },
  {
    num: 0,
    title: "GitHub Contributions",
  },
];

const Stats = () => {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        // 2. Fetch both APIs in parallel
        const [leetcodeRes, githubRes] = await Promise.all([
          fetch("/api/leetcode"),
          fetch("/api/github"),
        ]);

        const leetcodeData = await leetcodeRes.json();
        const githubData = await githubRes.json();

        if (leetcodeData.error)
          throw new Error(`LeetCode fetch failed: ${leetcodeData.error}`);
        if (githubData.error)
          throw new Error(`GitHub fetch failed: ${githubData.error}`);

        // 3. Update the state with both fetched values
        setStats((prevStats) =>
          prevStats.map((stat) => {
            if (stat.title === "LeetCode Problems") {
              return { ...stat, num: leetcodeData.total };
            }
            if (stat.title === "GitHub Contributions") {
              return { ...stat, num: githubData.total };
            }
            return stat; // Return GFG and others unchanged
          })
        );
      } catch (error) {
        console.error("Failed to fetch stats:", error.message);
      }
    };

    fetchAllStats();
  }, []);

  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pt-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {/* 6. Map over the 'stats' state variable */}
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
            >
              <CountUp
                end={item.num} // This 'end' prop will update when the state changes
                duration={5}
                delay={2}
                className="text-4xl xl:text-6xl font-extrabold"
              />
              <p
                className={`${
                  item.title.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                } leading-snug text-white/80`}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
