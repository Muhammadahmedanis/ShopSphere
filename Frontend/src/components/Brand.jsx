import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Brand() {
    const brand = [
      {
        brand: "images/brand/br1.png",
      },
      {
        brand: "images/brand/br2.png",
      },
      {
        brand: "images/brand/br3.png",
      },
      {
        brand: "images/brand/br4.png",
      },
      {
        brand: "images/brand/br5.png",
      },
      {
        brand: "images/brand/br6.png",
      },
    ];

    const NextArrow = ({ onClick }) => (
        <div onClick={onClick} className="absolute top-[50%] translate-y-[-50%] right-0 text-3xl cursor-pointer  text-gray-600 hover:text-gray-800">
            <FaChevronRight />
        </div>
    );

    const PrevArrow = ({ onClick }) => (
        <div onClick={onClick} className="absolute top-[50%] translate-y-[-50%] left-0 text-3xl cursor-pointer  text-gray-600 hover:text-gray-800">
            <FaChevronLeft />
        </div>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Adjust this based on the container size and number of items
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };

    return (
        <div className="bg-white w-full px-2">
          <div className="m-10 overflow-hidden text-center relative"></div>
            <Slider {...settings}>
                {brand.map((val, ind) => (
                    <div key={ind}>
                        <div className="max-w-xs m-2 px-3">
                            {/* <div className="bg-gray-100 p-12 hover:bg-white hover:shadow-md"> */}
                                <img className="mx-auto transition-all duration-300 opacity-50 hover:opacity-100" src={val.brand} alt='category'/>
                            {/* </div> */}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Brand;
