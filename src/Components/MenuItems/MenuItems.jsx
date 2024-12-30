

const MenuItems = ({item}) => {
    const{image, price, recipe,name}=item
    return (
        <div className="flex space-x-4">
            <img src={image} alt="" className="w-28" style={{borderRadius: '0 200px 200px 200px'}} />
            <div>
                <h3 className="uppercase">{name}-----</h3>
                <p className="text-amber-600">{recipe}</p>
            </div>
            <p className="text-amber-600">${price}</p>
        </div>
    );
};

export default MenuItems;