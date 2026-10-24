import { notFound } from 'next/navigation';

const ProductDetailsPage = async ({ params }: { params: { productsId: string } }) => {
    const { productsId } = await params;

    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${productsId}`)
    const productData = await res.json()

    console.log(productData);
    if (!productData) {
        notFound()
    }

    const 

    return (
        <div className='bg-[#F0F5F0] py-10'>
            
            <div className='max-w-7xl mx-auto space-y-5'>
                {/* breadcrumbs */}
                <div>Home/cha/batham size</div>
                {/* titles */}
                <div className='flex justify-between items-center p-10 rounded-3xl bg-white'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-[#F0F5F0] p-5 rounded-2xl text-7xl'>{productData.image}</div>
                        <div className='space-y-2'>
                            <h2 className='text-4xl font-extrabold'>{productData.nameBn}</h2>
                            <p>প্রতি কেজি · <span>{productData.categoryNameBn}</span></p>
                            <p>গতকালের তুলনায় আজ দাম বেড়েছে · ২ টাকা</p>
                        </div>
                    </div>
                    <div>
                        <p>আজকের দাম</p>
                        <p></p>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default ProductDetailsPage;