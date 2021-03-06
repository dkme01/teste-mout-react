import { Pagination } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { usePaginationStyles } from "./styles";

interface CustomPaginationProps {
  dataSize: number;
  pageLimit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({
  dataSize,
  pageLimit,
  currentPage,
  onPageChange,
}: CustomPaginationProps) {
  const [pages, setPages] = useState<number>(() =>
    Math.round(dataSize / pageLimit)
  );
  const customClasses = usePaginationStyles();

  useEffect(() => {
    setPages(() => Math.round(dataSize / pageLimit));
  }, [dataSize]);

  return (
    <Pagination
      className={customClasses.root}
      count={pages}
      page={currentPage}
      onChange={(_, value) => onPageChange(value)}
      boundaryCount={1}
      showFirstButton
      showLastButton
      classes={{ ul: customClasses.paginationUl }}
    />
  );
}
