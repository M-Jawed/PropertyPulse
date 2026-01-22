const apiDomain = process.env.NEXT_PUBLIC_API ?? null;

const fetchProperties = async ({ showFeatured = false } = {}) => {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
    );
    if (!res.ok) {
      console.error("Failed to fetch properties");
      return;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err));
    return [];
  }
};

const fetchPropertyById = async (id: string) => {
  if (!id) return;

  try {
    if (!apiDomain) return;

    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      console.error("Failed to find property with that id");
      return [];
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch", error);
    return;
  }
};

export { fetchProperties, fetchPropertyById };
