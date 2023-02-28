import Link from "next/link";
import { api } from "~/utils/api";

export const Hero = (): JSX.Element => {
  const { data: items, isLoading } = api.item.getAll.useQuery();
  return (
    <section className="hero flex w-full flex-col items-center justify-center gap-y-5">
      <h1 className="text-4xl">ERC1155 Metadata public frontend</h1>
      <div>
        {isLoading && <span className="animate-pulse">Loading...</span>}
        <ul>
          {items?.map((item, index) => (
            <li key={`item-${index}`}>
              <Link href={`/api/item/${index}`}>
                <span className="underline hover:text-blue-500">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
