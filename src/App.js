import React, {
	useState,
	useEffect,
} from "react";
import "./style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import RatingStars from "./components/RatingStars";
import ShoppingCart from "./components/ShoppingCart";

const products = [
	{
		id: 1,
		name: "iPhone 13",
		rating: 4.3,
		price: 94156,
		image: "https://images.pexels.com/photos/13570143/pexels-photo-13570143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	},
	{
		id: 2,
		name: "Headset",
		rating: 4.8,
		price: 72000,
		image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	},
	{
		id: 3,
		name: "iPad",
		rating: 3.2,
		price: 89000,
		image: "https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2/",
	},
	{
		id: 4,
		name: "Apple Smart Watch",
		rating: 4,
		price: 89999,
		image: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	},
	{
		id: 5,
		name: "Journal Book",
		rating: 4.5,
		price: 680,
		image: "https://images.pexels.com/photos/7150986/pexels-photo-7150986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	},
	{
		id: 6,
		name: "Rolex Watch",
		rating: 3.8,
		price: 45000,
		image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	},
	{
		id: 7,
		name: "Guitar",
		rating: 4,
		price: 34000,
		image: "https://images.pexels.com/photos/92069/pexels-photo-92069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	},
	{
		id: 8,
		name: "BackPack",
		rating: 4.3,
		price: 800,
		image: "https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	},
];

function App() {
	const [cartsVisibilty, setCartVisible] =
		useState(false);
	const [productsInCart, setProducts] =
		useState(
			JSON.parse(
				localStorage.getItem(
					"shopping-cart"
				)
			) || []
		);
	useEffect(() => {
		localStorage.setItem(
			"shopping-cart",
			JSON.stringify(productsInCart)
		);
	}, [productsInCart]);
	const addProductToCart = (product) => {
		const newProduct = {
			...product,
			count: 1,
		};
		setProducts([
			...productsInCart,
			newProduct,
		]);
	};

	const onQuantityChange = (
		productId,
		count
	) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === productId
				);
			if (productsIndex !== -1) {
				oldState[productsIndex].count =
					count;
			}
			return [...oldState];
		});
	};

	

	const onProductRemove = (product) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === product.id
				);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1);
			}
			return [...oldState];
		});
	};

	return (
		<div className="App">
			<ShoppingCart
				visibilty={cartsVisibilty}
				products={productsInCart}
				onClose={() =>
					setCartVisible(false)
				}
				onQuantityChange={
					onQuantityChange
				}
				onProductRemove={onProductRemove}
			/>
			<div className="navbar">
				<h3 className="logo">Shopping Cart</h3>
				<button
					className="btn shopping-cart-btn"
					onClick={() =>
						setCartVisible(true)
					}>
					<GiShoppingBag size={24} />
					{productsInCart.length >
						0 && (
						<span className="product-count">
							{
								productsInCart.length
							}
						</span>
					)}
				</button>
			</div>
			<main>
				<h2 className="title">
					Products
				</h2>
				<div className="products">
					{products.map((product) => (
						<div
							className="product"
							key={product.id}>
							<img
								className="product-image"
								src={
									product.image
								}
								alt={
									product.image
								}
							/>
							<h4 className="product-name">
								{product.name}
							</h4>
							<RatingStars
								rating={
									product.rating
								}
							/>
							<p>
								{
									product.description
								}
							</p>
							<span className="product-price">
								{product.price}₹
							</span>
							<div className="buttons">
								
								<button
									className="btn"
									onClick={() =>
										addProductToCart(
											product
										)
									}>
									Add to cart
								</button>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export default App;
