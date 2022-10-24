import React from "react";
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pagintaion.css";
export const PaginationPage = (props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postPerPage); i++) {
    pageNumbers.push(i);
  }

  let items = [];

  pageNumbers.map((number) =>
    items.push(
      <Pagination.Item onClick={() => props.paginate(number)} key={number}>
        {number}
      </Pagination.Item>
    )
  );

  return (
    <div className="display-container">
      <Pagination className="ml-2">{items}</Pagination>
    </div>
  );
};

export default PaginationPage;
