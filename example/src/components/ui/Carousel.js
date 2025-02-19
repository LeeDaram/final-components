import { Carousel } from "flowbite-react";
import CarouselImg1 from "../../assets/images/CarouselImg/CarouselImg1.png";
import CarouselImg2 from "../../assets/images/CarouselImg/CarouselImg2.png";
import CarouselImg3 from "../../assets/images/CarouselImg/CarouselImg3.png";
import CarouselImg4 from "../../assets/images/CarouselImg/CarouselImg4.png";
import CarouselImg5 from "../../assets/images/CarouselImg/CarouselImg5.png";

export function ImgCarousel() {
  return (
    <div className="h-32 sm:h-8 xl:h-20 2xl:h-60">
      <Carousel className="text-white text-xl" leftControl="<" rightControl=">">
        <img src={CarouselImg1} alt="CarouselImg1" />
        <img src={CarouselImg2} alt="CarouselImg2" />
        <img src={CarouselImg3} alt="CarouselImg3" />
        <img src={CarouselImg4} alt="CarouselImg4" />
        <img src={CarouselImg5} alt="CarouselImg5" />
      </Carousel>
    </div>
  );
}
