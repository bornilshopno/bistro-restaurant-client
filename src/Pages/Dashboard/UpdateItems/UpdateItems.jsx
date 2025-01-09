import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key=import.meta.env.VITE_IMGBB_HOSTING_API;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItems = () => {
    const item=useLoaderData();
  const {name,price,category,image,recipe,_id}=item;
    const {
        register,
        handleSubmit,
        watch,reset,
        formState: { errors },
    } = useForm()
const axiosPublic=useAxiosPublic();
const axiosSecure=useAxiosSecure();
    const onSubmit = async(data) => {
        //image upload to imgbb and then get an url
        const imageFile={image: data.image[0]}
        console.log(data);
    const res=await axiosPublic.post(image_hosting_api,imageFile,{
        headers:{
            'content-type': 'multipart/form-data'
        }
    } );
console.log(res.data) 
if(res.data.success){
    //now send the menu item data with the image url to the server
    const menuItem= {
        name: data.name,
        category:data.category,
        price:data.price,
        recipe:data.recipe,
        image:  res.data.data.display_url,
    };
    //
    const menuResponse= await axiosSecure.patch(`/menu/${_id}`, menuItem)
    console.log(menuResponse.data)
    if (menuResponse.data.modifiedCount){
        // reset();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Item updated in the ${data.category} menu`,
            showConfirmButton: false,
            timer: 1500
          });
    }
}

}
    return (
        <div>
            <SectionTitle heading="Update Item" subHeading="Refresh Info">

            </SectionTitle>
            <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
            
                                <label className="form-control w-full max-w-xs mb-1">
                                    <div className="label">
                                        <span className="label-text">Item name</span>
                                    </div>
                                    <input
                                    defaultValue={name}
                                        {...register("name",{required:true})}
                                        type="text"
                                        placeholder="Name of the item" className="input input-bordered w-full max-w-xs" />
            
                                </label>
                                <div className="flex flex-col lg:flex-row lg:gap-5">
                                    <div>
                                        <label className="form-control w-full max-w-xs mb-1">
                                            <div className="label">
                                                <span className="label-text">Category</span>
                                            </div>
                                            <select defaultValue={category}
                                                {...register("category",{required:true})}
                                                className="select select-bordered w-full max-w-xs">
                                                <option disabled value="default" >Select Category</option>
                                                <option value="salad">Salad</option>
                                                <option value="pizza">Pizza</option>
                                                <option value="desserts">Desserts</option>
                                                <option value="soup">Soup</option>
                                                <option value="drinks">Drinks</option>
                                            </select>
            
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full max-w-xs mb-1">
                                            <div className="label">
                                                <span className="label-text">Price*</span>
                                            </div>
                                            <input
                                            defaultValue={price}
                                                {...register("price",{required:true})}
                                                type="number"
                                                placeholder="Price" className="input input-bordered w-full max-w-xs" />
            
                                        </label>
                                    </div>
                                </div>
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Receipe Detail</span>
                                    </div>
                                    <textarea defaultValue={recipe}
                                    {...register("recipe" ,{required:true})} className="textarea textarea-bordered h-24" placeholder="receipe detail"></textarea>
            
                                </label>
                                <div className="form-control w-full py-6">
                                    <input 
                                    
                                    {...register("image")} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                                    {/* {...register("image" ,{required:true})} type="file" className="file-input file-input-bordered w-full max-w-xs" /> */}
                                </div>
            
                                <button className="btn">Update Item <FaUtensils className="ml-2" /></button>
            
            
                            </form>
                        </div>
        </div>
    );
};

export default UpdateItems;