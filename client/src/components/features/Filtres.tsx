import React from "react";
import styled, { css } from "styled-components";

import Text from "../shared/Text";

type FilterProps = {};

const SIZE = {
  small: css`
    height: 47px;
  `,
  medium: css`
    height: 64px;
  `,

  large: css`
    height: 64px;
  `,
};

const Filtres: React.FC<FilterProps> = (props) => {
  return (
    <>
      <StyledFilters className="filter__group">
      <Text
        color="dark"
        fontWeight="bold"
        fontSize="mediumBig"
        className="filter__text"
      >
        Catalog
      </Text>
        <div className="filter__select--container">
          <select className="filter__select--genre">
            <option value="Genre">
              Genre
            </option>
            <option value="Fiction">Fiction</option>
            <option value="Non—fiction">Non—fiction</option>
            <option value="Light fiction">Light fiction</option>
            <option value="Science-fiction">Science-fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Business & Finance">Business & Finance</option>
            <option value="Politics">Politics</option>
            <option value="Travel books">Travel books</option>
            <option value="Autobiography">Autobiography</option>
            <option value="History">History</option>
            <option value="Thriller / Mystery">Thriller / Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Satire">Satire</option>
            <option value="Horror">Horror</option>
            <option value="FicHealth / Medicinetion">Health / Medicine</option>
            <option value="Children’s books">Children’s books</option>
            <option value=">Encyclopedia">Encyclopedia</option>
          </select>
          <span className="filter__select--icon"></span>
        </div>
        <div className="filter__select--container">
          <select className="filter__select--price">
            <option value="Satire">Satire</option>
          </select>
          <span className="filter__select--icon"></span>
        </div>
        <div className="filter__select--container">
          <select className="filter__select--custom">
            <option value="Price">Price</option>
            <option value="Name">Name</option>
            <option value="Author name">Author name</option>
            <option value="Rating">Rating</option>
            <option value="Date of issue">Date of issue</option>
          </select>
          <span className="filter__select--icon"></span>
        </div>
      </StyledFilters>
    </>
  );
};

const StyledFilters = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  .filter {
    &__text {
      margin-bottom: 13px;
    }
  }

  select {
    height: 48px;
    position: relative;
    width: 100%;
    padding: 10px 0 10px 15px;
    background-color: ${(props) => props.theme.colors.light};
    border-radius: 16px;
    border: none;
    appearance: none;
    color: ${(props) => props.theme.colors.darkBlue};
    font-size: ${(props) => props.theme.colors.smallBig};
    font-weight: 500;
  }

  .filter__select--container {
      position: relative;
      width: 100%;
      height: 48px;
      margin-bottom: 20px;
    }

    .filter__select--icon {
      position: absolute;
      top: 12px;
      right: 8px;
      width: 24px;
      height: 24px;
      background: transparent;
      background-image: url("/images/icons/Select.svg");
      background-repeat: no-repeat;
    }
    
    .filter__text {
      align-self: flex-start;
    }
`;

export default Filtres;
