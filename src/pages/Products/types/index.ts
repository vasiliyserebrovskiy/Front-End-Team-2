export interface Product {
  itemID: number;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  restaurantName: string;
  restaurantID: number;
  imageUrl: string;
}
export interface RestaurantDetails {
	restaurantID: number;
	restaurantName: string;
	address: string;
	type: string;
	parkingLot: boolean;
}
