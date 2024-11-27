import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/api/productApiSlice';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from './Products/Product';

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  console.log('🚀 ~ Home ~ useGetProductsQuery:', useGetProductsQuery);

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError?.data?.message || isError?.error}</Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">Special Products</h1>

            <Link to="/shop" className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]">
              Shop
            </Link>
          </div>

          <div>
            {/* <div className="flex justify-center flex-wrap mt-[2rem]"> */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-8 ml-10 mt-[2rem]">
              {data?.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Home;