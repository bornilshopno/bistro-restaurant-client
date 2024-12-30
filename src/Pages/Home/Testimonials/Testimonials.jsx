import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { FaQuoteLeft } from "react-icons/fa";


const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        const loadData = () => {
            fetch("reviews.json")
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
        }

        loadData()


    }, [])
    console.log(reviews)
    return (
        <div className="my-20">
            <SectionTitle heading={"Testimonials"} subHeading={"What Out Cliend Say"}>
            </SectionTitle>
            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {reviews?.map(review =>
                        <SwiperSlide key={review._id}>
                            <div className="mx-24 flex flex-col items-center my-16">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <FaQuoteLeft className="text-3xl mt-6"></FaQuoteLeft>
                                <p className="py-8">{review.details}</p>
                                <h3 className="text-2xl text-amber-600">{review.name}</h3>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper></div>
        </div>
    );
};

export default Testimonials;