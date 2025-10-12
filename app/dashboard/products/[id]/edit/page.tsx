import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import { ProductSchema } from "@/lib/validations/auth";
import { notFound } from "next/navigation";

async function getProductById(id: string) {
	const url = `${process.env.API_URL}/products/${id}`;
	const req = await fetch(url);
	const json = await req.json();
	if (!req.ok) {
		notFound();
	}

	const product = ProductSchema.parse(json);

	return product;
}

export default async function EditProductPage({ params }: { params: { id: string } }) {

    const {id} = await params;
    const product = await getProductById(id);

	return (
		<div className="max-w-3xl mx-auto">
			<h1 className="text-3xl font-bold mb-4 md:mb-8">Productos</h1>

			<EditProductForm>
				<ProductForm product={product}/>
			</EditProductForm>
		</div>
	);
}
