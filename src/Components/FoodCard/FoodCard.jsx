import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";




const FoodCard = ({ item }) => {
  const { image, price, recipe, name , _id} = item;
  const [, refetch]=useCart()
  const navigate = useNavigate()
  const { user } = useAuth()
  const axiosSecure=useAxiosSecure()
  const location=useLocation();
  console.log(user)
  const handleAddtoCart = (food) => {
    if (user && user?.email) {
       const cartItem={
       menuId : _id,
       email: user.email,
       name,
       image,
       price
      }

      axiosSecure.post("/carts", cartItem)
      .then(res=>{
        if(res.data.insertedId){
          Swal.fire({
            title: `Item ${name} Added to Cart Succefully`,
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
          //refetch to update the cart instantly
          refetch()
        }
      })
    }
    else {
      Swal.fire({
        title: "You are not logged in!",
        text: "to add to cart pls login!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log In!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {state:{from:location}})
        }
      });
    }
  }
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src={image}
          alt="Shoes" />
      </figure>
      <p className="bg-slate-900 text-white absolute right-4 top-4 px-3">${price}</p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-outline border-0 border-b-4 border-amber-500 mt-4 bg-slate-100" onClick={() => handleAddtoCart(item)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;