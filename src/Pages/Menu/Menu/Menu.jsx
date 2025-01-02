import { Helmet } from "react-helmet-async";
import Cover from "../../../Components/Shared/Cover";
import menuImg from "../../../assets/menu/banner3.jpg"
import desertImg from "../../../assets/menu/dessert-bg.jpeg"
import soupImg from "../../../assets/menu/soup-bg.jpg"
import drinksImg from "../../../assets/menu/banner3.jpg"
import saladImg from "../../../assets/menu/salad-bg.jpg"
import pizzaImg from "../../../assets/menu/pizza-bg.jpg"
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import CategoryMenu from "../CategoryMenu/CategoryMenu";


const Menu = () => {
    const[menu]=useMenu();
    const dessert=menu?.filter(item=>item.category==="dessert");
    const soup=menu?.filter(item=>item.category==="soup");
    const drinks=menu?.filter(item=>item.category==="drinks");
    const pizza=menu?.filter(item=>item.category==="pizza");
    const salad=menu?.filter(item=>item.category==="salad");
    const offered=menu?.filter(item=>item.category==="offered");
// console.log("salads",salad,"pizzas", pizza, "drinks", drinks,"soups", soup,"desserts",dessert,"offered", offered)

    return (
        <div>
            <Helmet>
                <title>BistroBoss || Menu</title>
            </Helmet>
            <Cover img={menuImg} title={"Our Menu"}></Cover>
            {/* main menu  */}
            <SectionTitle heading={"Todays Offer"} subHeading={"Dont Miss"}
            ></SectionTitle>
            {/* offered  */}
            <CategoryMenu items={offered}></CategoryMenu>
            {/* dessert menu */}
            <CategoryMenu items={dessert} coverImage={desertImg} title={"desert"}>
            </CategoryMenu>
            {/* pizza menu */}
            <CategoryMenu items={pizza} coverImage={pizzaImg} title={"pizza"}>
            </CategoryMenu>
            {/* salad menu */}
            <CategoryMenu items={salad} coverImage={saladImg} title={"salad"}>
            </CategoryMenu>
            {/* soup menu */}
            <CategoryMenu items={soup} coverImage={soupImg} title={"soup"}>
            </CategoryMenu>
            {/* drinks menu */}
            <CategoryMenu items={drinks} coverImage={drinksImg} title={"drinks"}>
            </CategoryMenu>
         
        </div>
    );
};

export default Menu;