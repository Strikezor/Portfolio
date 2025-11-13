// File: app/api/leetcode/route.js

import { NextResponse } from "next/server";

const LEETCODE_API_ENDPOINT = "https://leetcode.com/graphql/";
const USERNAME = "akshay064";

// This is the specific GraphQL query LeetCode's profile page uses
const query = `
  query userProfileUserQuestionProgress($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const response = await fetch(LEETCODE_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Referer' is sometimes needed to mimic a real browser request
        Referer: `https://leetcode.com/u/${USERNAME}/`,
      },
      body: JSON.stringify({
        query,
        variables: { username: USERNAME },
        operationName: "userProfileUserQuestionProgress",
      }),
      // Revalidate the data every hour (3600 seconds)
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check for GraphQL-specific errors
    if (data.errors) {
      throw new Error(data.errors.map((e) => e.message).join("\n"));
    }

    const submissions = data.data.matchedUser.submitStatsGlobal.acSubmissionNum;

    // Find the 'All' category for the total count
    const totalSolved =
      submissions.find((e) => e.difficulty === "All")?.count || 0;
    const easySolved =
      submissions.find((e) => e.difficulty === "Easy")?.count || 0;
    const mediumSolved =
      submissions.find((e) => e.difficulty === "Medium")?.count || 0;
    const hardSolved =
      submissions.find((e) => e.difficulty === "Hard")?.count || 0;

    // Return the data
    return NextResponse.json({
      total: totalSolved,
      easy: easySolved,
      medium: mediumSolved,
      hard: hardSolved,
    });
  } catch (error) {
    console.error("Error fetching LeetCode data:", error.message);
    return NextResponse.json(
      { error: "Error fetching LeetCode data" },
      { status: 500 }
    );
  }
}
