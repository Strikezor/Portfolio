import { NextResponse } from "next/server";

const GITHUB_API_ENDPOINT = "https://api.github.com/graphql";
const USERNAME = "Strikezor";

// 1. Get the token from the .env.local file
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// 2. This is the GraphQL query to get the total contribution count
const query = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`;

export async function GET() {
  // 3. Check if the token is available
  if (!GITHUB_TOKEN) {
    console.error("Error: GITHUB_TOKEN is not set in environment variables.");
    return NextResponse.json(
      { error: "Server configuration error: GITHUB_TOKEN is missing." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(GITHUB_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 4. Authenticate with the token
        Authorization: `bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { username: USERNAME },
      }),
      // 5. Revalidate the data every hour (3600 seconds)
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors.map((e) => e.message).join("\n"));
    }

    // 6. Extract the specific number
    const totalContributions =
      data.data.user.contributionsCollection.contributionCalendar
        .totalContributions;

    // 7. Send it back to your front-end
    return NextResponse.json({
      total: totalContributions,
    });
  } catch (error) {
    console.error("Error fetching GitHub data:", error.message);
    return NextResponse.json(
      { error: "Error fetching GitHub data" },
      { status: 500 }
    );
  }
}
