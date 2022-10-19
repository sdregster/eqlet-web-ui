import { useMemo } from 'react';

export const useCharacterFilter = (characters, query) => {
  const filteredCharacters = useMemo(() => {
    return characters.filter((character) =>
      character.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, characters]);

  return filteredCharacters;
};
