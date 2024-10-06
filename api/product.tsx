import { API } from "@/app/api";
import { ProductModel } from "@/interfaces/product.interface";

export async function getProducts(category: string): Promise<ProductModel[]> {
    const response = await fetch(API.product.find, {
      method: "POST",
      body: JSON.stringify({
        category,
        limit: 10,
      }),
      headers: new Headers({ 'content-type': 'application/json' }),
      next: { revalidate: 10 }
    })
    return response.json();
  }