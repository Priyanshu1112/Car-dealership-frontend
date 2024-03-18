import { Trash, Pencil } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Nike Air Force 1 07 LV8",
    href: "#",
    price: "₹47,199",
    originalPrice: "₹48,900",
    discount: "5% Off",
    color: "Orange",
    size: "8 UK",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
  },
  {
    id: 2,
    name: "Nike Blazer Low 77 SE",
    href: "#",
    price: "₹1,549",
    originalPrice: "₹2,499",
    discount: "38% off",
    color: "White",
    leadTime: "3-4 weeks",
    size: "8 UK",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png",
  },
  {
    id: 3,
    name: "Nike Air Max 90",
    href: "#",
    price: "₹2219 ",
    originalPrice: "₹999",
    discount: "78% off",
    color: "Black",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png",
  },
];
const MyCars = () => {
  const [activeTab, setActiveTab] = useState("AllCars");

  return (
    <div className=" container flex flex-col py-4">
      {/* <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-xl font-semibold">My Cars</h2>
          <p className="mt-1 text-sm font-medium text-gray-700"></p>
        </div>
      </div> */}

      {/* <div className="mt-7 border-b-[1px] border-[#D5DBE1] pb-0.5">
        <button
          onClick={() => setActiveTab("AllCars")}
          className={`text-base text-[#40464C] font-medium ${
            activeTab == "AllCars" ? "border-b-[1px] border-black" : ""
          }  pr-10 py-[11px]`}
        >
          All Cars
        </button>
        <button
          onClick={() => setActiveTab("ActiveCars")}
          className={`text-base text-[#40464C] font-medium ${
            activeTab == "ActiveCars" ? "border-b-[1px] border-black" : ""
          }  pr-10 py-[11px]`}
        >
          Active Cars
        </button>
        <button
          onClick={() => setActiveTab("Ongoing")}
          className={`text-base text-[#40464C] font-medium ${
            activeTab == "Ongoing" ? "border-b-[1px] border-black" : ""
          }  pr-10 py-[11px]`}
        >
          Ongoing Deals
        </button>
        <button
          onClick={() => setActiveTab("SoldCars")}
          className={`text-base text-[#40464C] font-medium ${
            activeTab == "SoldCars" ? "border-b-[1px] border-black" : ""
          }  pr-10 py-[11px]`}
        >
          Sold Cars
        </button>
      </div> */}

      <div className="mt-7 w-full justify-between flex items-center gap-7 ">
        <div>
          <button
            onClick={() => setActiveTab("AllCars")}
            className={` ${
              activeTab == "AllCars" ? "bg-white" : ""
            } p-4  rounded-t-xl`}
          >
            All Cars
          </button>
          <button
            onClick={() => setActiveTab("ActiveCars")}
            className={`${
              activeTab == "ActiveCars" ? "bg-white" : ""
            } p-4  rounded-t-xl`}
          >
            Active Cars
          </button>
          <button
            onClick={() => setActiveTab("Ongoing")}
            className={` ${
              activeTab == "Ongoing" ? "bg-white" : ""
            } p-4  rounded-t-xl`}
          >
            Ongoing Deals
          </button>
          <button
            onClick={() => setActiveTab("SoldCars")}
            className={` ${
              activeTab == "SoldCars" ? "bg-white" : ""
            } p-4  rounded-t-xl`}
          >
            Sold Cars
          </button>
        </div>
        <Link
          to={`/dealer/add-Car`}
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Add new car
        </Link>
      </div>

      <div className="bg-white p-5 rounded-xl">
        <ul className="flex flex-col divide-y divide-gray-200 mt-3">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex flex-col py-6 sm:flex-row sm:justify-between px-6 mb-5 "
            >
              <div className="flex w-full space-x-2 sm:space-x-4">
                <img
                  className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                  src={product.imageSrc}
                  alt={product.name}
                />
                <div className="flex w-full flex-col justify-between pb-4">
                  <div className="flex w-full justify-between space-x-2 pb-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                        {product.name}
                      </h3>
                      <p className="text-sm">{product.color}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{product.price}</p>
                    </div>
                  </div>
                  <div className="flex divide-x text-sm">
                    <button
                      type="button"
                      className="flex items-center space-x-2 px-2 py-1 pl-0 hover:text-red-400"
                    >
                      <Trash size={16} />
                      <span>Remove</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-2 px-2 py-1 hover:text-blue-400"
                    >
                      <Pencil size={16} />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyCars;

// import { Trash, Heart, Pencil } from "lucide-react";
// import { useState } from "react";

// const products = [
//   {
//     id: 1,
//     name: "Nike Air Force 1 07 LV8",
//     href: "#",
//     price: "₹47,199",
//     originalPrice: "₹48,900",
//     discount: "5% Off",
//     color: "Orange",
//     size: "8 UK",
//     imageSrc:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
//   },
//   {
//     id: 2,
//     name: "Nike Blazer Low 77 SE",
//     href: "#",
//     price: "₹1,549",
//     originalPrice: "₹2,499",
//     discount: "38% off",
//     color: "White",
//     leadTime: "3-4 weeks",
//     size: "8 UK",
//     imageSrc:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png",
//   },
//   {
//     id: 3,
//     name: "Nike Air Max 90",
//     href: "#",
//     price: "₹2219 ",
//     originalPrice: "₹999",
//     discount: "78% off",
//     color: "Black",
//     imageSrc:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png",
//   },
// ];
// const MyCars = () => {
//   const [activeTab, setActiveTab] = useState("AllCars");

//   return (
//     <div className=" container flex flex-col py-4">
//       {/* <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
//         <div>
//           <h2 className="text-xl font-semibold">My Cars</h2>
//           <p className="mt-1 text-sm font-medium text-gray-700"></p>
//         </div>
//       </div> */}

//       {/* <div className="mt-7 border-b-[1px] border-[#D5DBE1] pb-0.5">
//         <button
//           onClick={() => setActiveTab("AllCars")}
//           className={`text-base text-[#40464C] font-medium ${
//             activeTab == "AllCars" ? "border-b-[1px] border-black" : ""
//           }  pr-10 py-[11px]`}
//         >
//           All Cars
//         </button>
//         <button
//           onClick={() => setActiveTab("ActiveCars")}
//           className={`text-base text-[#40464C] font-medium ${
//             activeTab == "ActiveCars" ? "border-b-[1px] border-black" : ""
//           }  pr-10 py-[11px]`}
//         >
//           Active Cars
//         </button>
//         <button
//           onClick={() => setActiveTab("Ongoing")}
//           className={`text-base text-[#40464C] font-medium ${
//             activeTab == "Ongoing" ? "border-b-[1px] border-black" : ""
//           }  pr-10 py-[11px]`}
//         >
//           Ongoing Deals
//         </button>
//         <button
//           onClick={() => setActiveTab("SoldCars")}
//           className={`text-base text-[#40464C] font-medium ${
//             activeTab == "SoldCars" ? "border-b-[1px] border-black" : ""
//           }  pr-10 py-[11px]`}
//         >
//           Sold Cars
//         </button>
//       </div> */}

//       <div className="mt-7 flex items-center gap-7 mb-3">
//         <button
//           onClick={() => setActiveTab("AllCars")}
//           className={` ${activeTab == "AllCars" ? "" : ""}`}
//         >
//           All Cars
//         </button>
//         <button
//           onClick={() => setActiveTab("ActiveCars")}
//           className={` ${activeTab == "ActiveCars" ? "" : ""}`}
//         >
//           Active Cars
//         </button>
//         <button
//           onClick={() => setActiveTab("Ongoing")}
//           className={` ${activeTab == "Ongoing" ? "" : ""}`}
//         >
//           Ongoing Deals
//         </button>
//         <button
//           onClick={() => setActiveTab("SoldCars")}
//           className={` ${activeTab == "SoldCars" ? "" : ""}`}
//         >
//           Sold Cars
//         </button>
//       </div>

//       <ul className="flex flex-col divide-y divide-gray-200 mt-3">
//         {products.map((product) => (
//           <li
//             key={product.id}
//             className="flex flex-col py-6 sm:flex-row sm:justify-between bg-white px-6 rounded-2xl mb-5 shadow-md"
//           >
//             <div className="flex w-full space-x-2 sm:space-x-4">
//               <img
//                 className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
//                 src={product.imageSrc}
//                 alt={product.name}
//               />
//               <div className="flex w-full flex-col justify-between pb-4">
//                 <div className="flex w-full justify-between space-x-2 pb-2">
//                   <div className="space-y-1">
//                     <h3 className="text-lg font-semibold leading-snug sm:pr-8">
//                       {product.name}
//                     </h3>
//                     <p className="text-sm">{product.color}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-lg font-semibold">{product.price}</p>
//                   </div>
//                 </div>
//                 <div className="flex divide-x text-sm">
//                   <button
//                     type="button"
//                     className="flex items-center space-x-2 px-2 py-1 pl-0 hover:text-red-400"
//                   >
//                     <Trash size={16} />
//                     <span>Remove</span>
//                   </button>
//                   <button
//                     type="button"
//                     className="flex items-center space-x-2 px-2 py-1 hover:text-blue-400"
//                   >
//                     <Pencil size={16} />
//                     <span>Edit</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyCars;
