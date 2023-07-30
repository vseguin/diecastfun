import { useRouter } from "next/router";
import TablePagination from "@mui/material/TablePagination";

type Props = {
  page: number;
  total: number;
};

export default function Pagination({ page, total }: Props) {
  const { push, query } = useRouter();

  const setPage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    push({ query: { ...query, page: newPage } }, undefined, { shallow: true });
  };

  return (
    <TablePagination
      component="div"
      count={total}
      page={page}
      onPageChange={setPage}
      rowsPerPageOptions={[24]}
      rowsPerPage={24}
      showFirstButton={true}
      showLastButton={true}
      sx={{
        "& .MuiTablePagination-toolbar": {
          paddingLeft: 0,
        },
      }}
    />
  );
}
