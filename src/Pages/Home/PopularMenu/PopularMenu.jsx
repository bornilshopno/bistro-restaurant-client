import SectionTitle from "../../../Components/Shared/SectionTitle";
import MenuItems from "../../../Components/MenuItems/MenuItems";
import useMenu from "../../../Hooks/useMenu";


const PopularMenu = () => {
    const [menu]=useMenu();
    const popularItems=menu?.filter(item=>item.category==="popular");
        // console.log(popularItems)

    return (
        <div className="mb-5">
            <SectionTitle heading={"From Our Menu"} subHeading={"Popular Items"}>

            </SectionTitle>
            <div className="grid md:grid-cols-2 gap-10 ">
                {popularItems?.map(item=><MenuItems key={item._id} item={item}></MenuItems>)}
            </div>
            
        </div>
    );
};

export default PopularMenu;