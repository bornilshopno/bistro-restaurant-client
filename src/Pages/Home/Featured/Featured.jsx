import SectionTitle from "../../../Components/Shared/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg"
import "./Featured.css"

const Featured = () => {
    return (
        <div className="featured-item text-white pt-10 my-10 bg-fixed">
            <SectionTitle heading={"Featured Item"} subHeading={"Check It Out"}>

            </SectionTitle>
            <div className="md:flex gap-4 pt-8 pb-16 px-36 justify-center items-cneter bg-slate-500 bg-opacity-70">
            <div>
                <img src={featuredImg} alt="" />
            </div>
            <div>
                <p> Aug 20, 2029</p>
                <p className="uppercase">
                    Where can I get Some
                </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia aspernatur ut neque eligendi, repellendus dolores consequatur, ipsa officiis amet officia, rerum molestiae! Dolorem doloremque nulla alias, expedita asperiores, odit veritatis pariatur eius cum sunt enim modi dolorum veniam mollitia. Ab est deleniti officiis quaerat tempora natus expedita dolorum fuga in!</p>
                <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
            </div>

            </div>
         
            
        </div>
    );
};

export default Featured;