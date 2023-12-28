import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

type PaginationProps = {

};

type QueryProps = {
  page?: string;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const router = useRouter();
  const page = router.query.page as QueryProps;

  const handleNextPage = () => {
    const nextPage = page ? Number(page) + 1 : 2;
    router.push(`/catalog?page=${nextPage}`, undefined, { shallow: true });
  }

  const handlePreviousPage = () => {
    const previousPage = page ? Number(page) - 1 : "";
    if (!previousPage) {
      router.push(`/catalog`, undefined, { shallow: true });
    } else {
      router.push(`/catalog?page=${previousPage}`, undefined, { shallow: true });
    }
  }

  return (
    <StyledPagination>
      <span className="pagination__arrow pagination__arrow--left" onClick={handlePreviousPage}></span>
      <div className="pagination__circle--container">
        <Link href={`/catalog?page=1`} className="pagination__circle pagination__circle--active"></Link> 
        <Link href={`/catalog?page=2`} className="pagination__circle" scroll={false}></Link>      
        <Link href={`/catalog?page=3`} className="pagination__circle"></Link>
      </div> 
      <span className="pagination__arrow pagination__arrow--right" onClick={handleNextPage}></span>            
    </StyledPagination>
  );
};

const StyledPagination = styled.div`
  width: 268px;
  height: 24px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;

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
