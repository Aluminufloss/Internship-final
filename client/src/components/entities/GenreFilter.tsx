import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

type GenreFilterProps = {
  className?: string;
};

type QueryProps = {
  genre: string | undefined,
}

const GenreFilter: React.FC<GenreFilterProps> = (props) => {
  const router = useRouter();

  function handleSelectGenre(value: string) {
    const currentQuery = { ...router.query } as QueryProps;

    if (value !== "Genre") {
      currentQuery.genre = value;
    } else {
      delete currentQuery['genre'];
    }

    router.push(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined,
      { shallow: false,
        scroll: false,
      }
    );
  }

  return (
    <StyledGenreFilter className={props.className}>
      <select
        className="filter__select--genre"
        onChange={(ev) => handleSelectGenre(ev.target.value)}
      >
        <option value="Genre">Genre</option>
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
    </StyledGenreFilter>
  );
};

const StyledGenreFilter = styled.div<GenreFilterProps>`
  position: relative;
  width: 100%;
  height: 48px;
  margin-bottom: 20px;

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
`;

export default GenreFilter;
