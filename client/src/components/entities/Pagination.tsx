import Link from "next/link";
import React from "react";
import styled from "styled-components";

type PaginationProps = {

};

const Pagination: React.FC<PaginationProps> = (props) => {
 
  return (
    <StyledPagination>
      <span className="pagination__arrow pagination__arrow--left"></span>
      <div className="pagination__circle--container">
        <Link href={`/catalog?page=1`} className="pagination__circle pagination__circle--active"></Link> 
        <Link href={`/catalog?page=2`} className="pagination__circle" shallow scroll={false}></Link>      
        <Link href={`/catalog?page=3`} className="pagination__circle" shallow></Link>
      </div> 
      <span className="pagination__arrow pagination__arrow--right"></span>            
    </StyledPagination>
  );
};

const StyledPagination = styled.div`
  width: 268px;
  height: 24px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;
  margin-top: 40px;

  .pagination {
    &__circle {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-image: url("/images/icons/Ellipse.svg");
      background-repeat: no-repeat;
      background-size: cover;
      transition: all .3s ease;

      &--container {
        & span:not(:last-child) {
          margin-right: 30px;
        }
      }

      &--active {
        background-image: url("/images/icons/Ellipse-fill.svg");
      }

      &:hover {
        transform: scale(1.20);
      }
    }

    &__arrow {
      width: 24px;
      height: 24px;
      background-repeat: no-repeat;
      background-size: cover;
      transition: all .3s ease;

      &--left {
        background-image: url("/images/icons/Back.svg");
      }

      &--right {
        background-image: url("/images/icons/Forward.svg");
      }

      &:hover {
        transform: scale(1.20);
      }
    }
  }
`;

export default Pagination;
