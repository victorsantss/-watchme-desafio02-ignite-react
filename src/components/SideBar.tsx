import { useEffect, useState } from "react";
import { Button } from "./Button";
import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface GenreSelectedProps {
  genrerSelected: {
    id: number;
    handleClickButton: (id: number) => void;
  };
}

export function SideBar(props: GenreSelectedProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.genrerSelected.handleClickButton(genre.id)}
            selected={props.genrerSelected.id === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
