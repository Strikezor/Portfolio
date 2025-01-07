import Photo from "@/components/Photo";
import Social from "@/components/Social";
import Stats from "@/components/Stats";
import { SpeedInsights } from "@vercel/speed-insights/next";
import DownloadCV from "@/components/DownloadCV";

const page = () => {
  return (
    <section className="h-full">
      <SpeedInsights />
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Software Developer</span>
            <h2 className="h2 mb-6">
              Hello! I{"'"}m<br />{" "}
              <span className="text-accent">Akshay Chaturvedi</span>
            </h2>
            <p className="max-w-[550px] mb-9 text-white/80">
              I am a performance-driven Developer passionate about solving
              web-based challenges. I’ve contributed to developing web
              applications and am often recognized for being dependability and
              excelling at multitasking.
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <DownloadCV />
              <div className="mb-8 xl:mb-0 ">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
        <Stats />
      </div>
    </section>
  );
};

export default page;
