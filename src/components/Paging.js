import React,{ useState, useEffect } from 'react';
import Loading from "./Loading";
import { HomeApi } from './Api';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function Paging() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState('');
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        async function getUser() {
          try {
            const response = await axios.get(HomeApi);
            const data = response.data
            console.log(data)
            setProduct(data.data)
            setLoading(false);
          } catch (error) {
            console.error(error);
          }
        }
        getUser()
      }, []);
      
      if (loading) {
        return (
          <main>
             <Loading />
          </main>
        );
      }


    const userPerpage = 1
    const pagesVisited = pageNumber * userPerpage

    const displayUsers = product
    .slice(pagesVisited, pagesVisited + userPerpage)
    .map(({avatar, id, email, first_name, last_name}) => (
        <div className="card_cont" key={id}>
                  <div className="product-card">
                    <img className="img-ban" src={avatar} alt={first_name} />
                    <p className="product-title">Name: <span className="product-name">{first_name} {last_name}</span></p>
                    <p className="product-title">email: <span className="product-name">{email}</span> </p>
                  </div>
                </div>  
        ));
  const pageCount = Math.ceil(product.length / userPerpage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

    return (
        <div className="App">
            {displayUsers}
            <ReactPaginate 
               previousLabel={"Previous"}
               nextLabel={"Next"}
               pageCount={pageCount}
               onPageChange={changePage}
               containerClassName={"paginationBttns"}
               previousLinkClassName={"previousBttn"}
               nextLinkClassName={"nextBttn"}
               disabledClassName={"paginationDisabled"}
               activeClassName={"paginationActive"}
            />
      </div>
    )
}

export default Paging
