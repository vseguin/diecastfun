import prisma from "../lib/prisma";
import Link from "next/link";

type Category = {
  name: String;
  count: Number;
};

type Props = {
  categories: Category[];
};

export default function CategoriesIndex({ categories }: Props) {
  return (
    <div>
      {categories.map((category) => {
        return (
          <div key={category.name}>
            <Link href={`/cars?category=${category.name}`}>
              {category.name}
            </Link>
            <div>{category.count.toString()}</div>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const categories = await prisma.tags.findMany({
    distinct: ["tags"],
    select: {
      tags: true,
    },
    orderBy: [
      {
        tags: "asc",
      },
    ],
  });

  let tags = await prisma.tags.groupBy({
    by: ["tags"],
    _count: {
      _all: true,
    },
  });
  tags = Object.assign({}, ...tags.map((t) => ({ [t.tags]: t._count._all })));

  const result = categories.map((c) => {
    return { name: c.tags, count: tags[c.tags] };
  });

  return {
    props: { categories: result },
  };
}
