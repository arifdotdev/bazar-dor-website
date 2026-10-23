import { notFound } from 'next/navigation';

const ProductDetailsPage1 = async({ params }: { params: { productsId: string}}) => {
    const { productsId } = await params;
    
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${productsId}`)
    const productData = res.json()

    if(!productData){
        notFound()
    }
    console.log(productData);

    return (
        <div>
            product details page
        </div>
    );
};

export default ProductDetailsPage1;