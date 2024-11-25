import { Icon } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

const socials = [
  {
    Icon: <FaGithub />,
    path: "https://github.com/Strikezor",
  },
  {
    Icon: <FaLinkedin />,
    path: "https://www.linkedin.com/in/akshaych064",
  },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => (
        <Link href={item.path} key={index} className={iconStyles}>
          {item.Icon}
        </Link>
      ))}
    </div>
  );
};

export default Social;
