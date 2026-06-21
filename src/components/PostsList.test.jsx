import { fireEvent, render, screen } from "@testing-library/react";
import PostsList from "./PostsList.jsx";

const createPosts = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    userId: (index % 5) + 1,
    title: `post title ${index + 1}`,
    body: `post body ${index + 1}`,
  }));

describe("PostsList", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("muestra el estado de carga y luego la primera página de posts", async () => {
    const posts = createPosts(12);
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => posts,
    });

    render(<PostsList />);

    expect(screen.getByText("Cargando posts...")).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { name: "Posts desde API" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Mostrando 1-10 de 12 posts")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Post #1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Post #10" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Post #11" }),
    ).not.toBeInTheDocument();
  });

  it("permite navegar a la siguiente página y muestra posts de esa página", async () => {
    const posts = createPosts(12);
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => posts,
    });

    render(<PostsList />);

    await screen.findByRole("heading", { name: "Posts desde API" });

    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));

    expect(screen.getByText("Mostrando 11-12 de 12 posts")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Post #11" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Post #12" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Post #1" }),
    ).not.toBeInTheDocument();
  });
});
