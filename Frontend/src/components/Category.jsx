import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Category() {
    const category = [
        { img: "/images/category/category1.png", category: "Bedroom" },
        { img: "/images/category/category7.png", category: "Office" },
        { img: "/images/category/category6.png", category: "Lighting" },
        { img: "/images/category/category5.png", category: "Bathroom" },
        { img: "/images/category/category4.png", category: "Kitchen" },
        { img: "/images/category/category3.png", category: "Interior" },
        { img: "/images/category/category2.png", category: "Livingroom" },
    ];

    const NextArrow = ({ onClick }) => (
        <div onClick={onClick} className="absolute top-[50%] translate-y-[-50%] -right-2 text-3xl cursor-pointer text-gray-600 hover:text-gray-800">
            <FaChevronRight />
        </div>
    );

    const PrevArrow = ({ onClick }) => (
        <div onClick={onClick} className="absolute top-[50%] translate-y-[-50%] -left-2 text-3xl cursor-pointer text-gray-600 hover:text-gray-800">
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
        <div className="bg-white m-10 text-center overflow-hidden relative">
            <Slider {...settings}>
                {category.map((val, ind) => (
                    <div key={ind}>
                        <div className="max-w-xs m-4 transition-transform transform hover:scale-105 hover:text-red-600">
                            <div className="bg-gray-100 p-12 hover:bg-white hover:shadow-md transition-all duration-300">
                                <img className="mx-auto" src={val.img} alt={val.category} />
                                <div className="mt-4">
                                    <p className="uppercase font-semibold">{val.category}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Category;
