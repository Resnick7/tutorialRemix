import { useFetcher } from "@remix-run/react";
import { ContactRecord, getFavorite  } from "../data";

export function Favorite ({contact}: {contact : ContactRecord}) {
  const favoriteList = getFavorite();
  const fetcher = useFetcher();
  const isFavorite = contact.some( contact => contact.id === favoriteList) //if que compruebe si el id del contacto está en favorito

  return (
    <fetcher.Form method="post">
      <button
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={isFavorite ? "false" : "true"}
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
};

///Función que si tocamos favorito controle si el id está en Favorito y lo agregue o remeuva según corresponda

/// Boton usable en el navlist de contactos

