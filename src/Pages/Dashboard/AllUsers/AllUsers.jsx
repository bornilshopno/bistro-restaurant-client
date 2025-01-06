import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [],refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            return res.data;
        }
    })

    const handleAdmin=user=>{
        console.log(user)
      axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res=>{
        console.log(res.data)
        if(res.data.modifiedCount>0){
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is an Admin now!`,
                showConfirmButton: false,
                timer: 1500
              });
        }
      })
    }



    const handleDeleteUser = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User Removed Successfully.",
                                icon: "success"
                            });
                        }

                    })
            }
        });
    }
    return (
        <div>
            <div className="flex justify-evenly">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>

            </div>
            <div className="overflow-x-auto w-full">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) =>
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    { user.role==="Admin" ? <p className="font-bold text-amber-700">Admin</p> : 
                                    <button onClick={()=>handleAdmin(user)} className="btn  bg-amber-500"
                                    ><FaUsers className="text-white text-2xl" /></button>}
                                </td>
                                <td>
                                    <button className="btn btn-ghost btn-xs text-red-600" onClick={() => handleDeleteUser(user._id)}><FaTrashAlt className="text-2xl" /></button></td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;