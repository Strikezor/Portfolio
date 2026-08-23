"use client";

import { FiDownload } from "react-icons/fi";
import { Button } from "./ui/button";

const DownloadCV = () => {
  return (
    <Button
      asChild
      variant="outline"
      size="lg"
      className="uppercase flex items-center gap-2"
    >
      <a
        href="https://akshay-chaturvedi-resume.tiiny.site"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Download CV</span>
        <FiDownload className="text-xl" />
      </a>
    </Button>
  );
};

export default DownloadCV;
