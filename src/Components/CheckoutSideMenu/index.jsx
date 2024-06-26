import { useContext } from "react";
// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../OrderCard";
import { totalPrice } from "../../utils";
import "./styles.css";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);
  // console.log('PRODUCT TO SHOW: ', context.productToShow);
  // console.log("CART: ", context.cartProducts);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id != id
    );
    context.setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: "23/03/24",
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts),
    };

    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
    context.setSearchByTitle(null);
  };

  // Close side menu when click outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     const menu = document.querySelector(".checkout-side-menu");
  //     if (menu && !menu.contains(event.target)) {
  //       context.closeCheckoutSideMenu();
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [context]);

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu scrollable-cards flex-col fixed right-0 border border-slate-500 rounded bg-slate-600`}
    >
      {/* Otra opción desde TailwindCSS: overflow-y-scroll */}
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => context.closeCheckoutSideMenu()}
          />
        </div>
      </div>
      <div className="px-6 flex-1">
        {context.cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.images}
            price={`$${product.price}`}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="px-6 mb-6">
        <p className="flex justify-between items-center mb-2">
          <span className="font-medium">Total: </span>
          <span className="font-medium text-2xl">
            ${totalPrice(context.cartProducts)}
          </span>
        </p>
        <Link to="/my-orders/last" className="text-blue-500">
          <button
            className="w-full bg-black py-3 text-white rounded-lg"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
