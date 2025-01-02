import { Link } from "react-router-dom";
import MenuItems from "../../../Components/MenuItems/MenuItems";
import Cover from "../../../Components/Shared/Cover";

const CategoryMenu = ({ items, title, coverImage }) => {
    return (
        <div className="my-8">
            {title && <Cover img={coverImage} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-10 my-10 ">
                {items?.map(item => <MenuItems key={item._id} item={item}></MenuItems>)}
            </div>
<Link to={`/order/${title}`}>
<button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
</Link>
        </div>

    );
};

export default CategoryMenu;