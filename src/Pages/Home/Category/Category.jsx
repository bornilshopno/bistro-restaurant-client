import { Swiper, SwiperSlide } from 'swiper/react';
import pic1 from "../../../assets/home/slide1.jpg"
import pic2 from "../../../assets/home/slide2.jpg"
import pic3 from "../../../assets/home/slide3.jpg"
import pic4 from "../../../assets/home/slide4.jpg"
import pic5 from "../../../assets/home/slide5.jpg"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import SectionTitle from '../../../Components/Shared/SectionTitle';


const Category = () => {
    return (
        <div>
            <SectionTitle heading={"Order Online"} subHeading={"From 9am to 10pm"}>
    

            </SectionTitle>
               <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-24"
      >
        <SwiperSlide><img src={pic1} alt="" />
        <h3 className='text-4xl text-white -mt-28 text-center uppercase'>Salads</h3></SwiperSlide>
        <SwiperSlide><img src={pic2} alt="" />
        <h3 className='text-4xl text-white -mt-28 text-center uppercase'>Pizza</h3></SwiperSlide>
        <SwiperSlide><img src={pic3} alt="" />
        <h3 className='text-4xl text-white -mt-28 text-center uppercase'>Soups</h3></SwiperSlide>
        <SwiperSlide><img src={pic4} alt="" />
        <h3 className='text-4xl text-white -mt-28 text-center uppercase'>Deserts</h3></SwiperSlide>
        <SwiperSlide><img src={pic5} alt="" />
        <h3 className='text-4xl text-white -mt-28 text-center uppercase'>Salads</h3></SwiperSlide>
        
      </Swiper>
        </div>
    );
};

export default Category;