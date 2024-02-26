import type { FunctionComponent } from "react";
import { useFetcher } from "@remix-run/react";
import { ContactRecord } from "../data";

export function Favorite(contact: ContactRecord) {
      const fetcher = useFetcher();
      const favorite = fetcher.formData
        ? fetcher.formData.get("favorite") === "true"
        : contact.favorite;
    
      return (
        <fetcher.Form method="post">
          <button
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            name="favorite"
            value={favorite ? "false" : "true"}
          >
            {favorite ? "★" : "☆"}
          </button>
        </fetcher.Form>
      );
    };