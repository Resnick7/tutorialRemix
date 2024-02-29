import { useFetcher } from "@remix-run/react";
import {
  ContactRecord,
  FavoriteRecord,
  getFavorite,
  addFavorite,
} from "../data";
import type { FunctionComponent } from "react";
import invariant from "tiny-invariant";
import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  return addFavorite(params.contactId);
};

export async function Favorite({ contact }: { contact: ContactRecord }) {
  const favoriteRecord = await getFavorite(contact.id);
  const fetcher = useFetcher();
  const isFavorite = favoriteRecord.favorite;

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
}

///Función que si tocamos favorito controle por id si es favorito o no y lo agregue o remueva según corresponda
/*

const Favorite: FunctionComponent<{
  contact: Pick<ContactRecord, "favorite">;
}> = ({ contact }) => {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

*/
