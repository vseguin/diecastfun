import prisma from "../lib/prisma";
import GridList from "../components/gridlist";
import { pluralize } from "../utils/typography";
import * as changeCase from "change-case";

type Category = {
  count: number;
  id: string;
  thumbnail: string;
};

type Props = {
  categories: Category[];
};

export default function CategoriesIndex({ categories }: Props) {
  return (
    <div>
      <GridList
        firstTitleFormatter={(c) => `${changeCase.sentenceCase(c.id)}`}
        items={categories}
        linkFormatter={(c) => `/cars?category=${c.id}`}
        secondTitleFormatter={(c) => `${pluralize(c.count, "car")}`}
      />
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

  const tagsQuery = await prisma.tags.groupBy({
    by: ["tags"],
    _count: {
      _all: true,
    },
  });
  const tags = Object.assign(
    {},
    ...tagsQuery.map((t) => ({ [t.tags]: t._count._all })),
  );

  const result = categories.map((c: { tags: string }) => {
    return {
      count: tags[c.tags],
      id: c.tags,
      thumbnail: `${process.env.STORAGE_URL}/images/tags/${c.tags.toLowerCase()}.png`,
    };
  });

  return {
    props: { categories: result },
  };
}
