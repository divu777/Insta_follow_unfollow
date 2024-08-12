import fs from "fs";

import { JSDOM } from "jsdom";

const readingFile = async (filename: string): Promise<HTMLAnchorElement[]> => {
  try {
    const data = await fs.promises.readFile(filename, "utf-8");
    const dom = new JSDOM(data);
    const document = dom.window.document;
    const elementList = document.querySelectorAll("a");
    return Array.from(elementList) as HTMLAnchorElement[];
  } catch (err) {
    console.error(`Error reading ${filename} file:`, err);
    return [];
  }
};

async function main() {
  let followingArray = await readingFile("following.html");
  let followersArray = await readingFile("followers.html");
  console.log("The number of followers: " + followersArray.length);
  console.log("The number of following: " + followingArray.length);

  const followersSet = new Set(followersArray.map((user) => user.href));

  const DoesNotFollowBack = followingArray.filter((user) => {
    return !followersSet.has(user.href);
  });

  console.log(
    "The number of people who doesn't follow back: " + DoesNotFollowBack.length
  );

  console.log("The List of who doesn't follow back are :");

  DoesNotFollowBack.forEach((user) => {
    console.log(user.href);
  });
}

main();
