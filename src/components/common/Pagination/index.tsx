import './style.scss';
import PaginationBootstrap from 'react-bootstrap/Pagination';

interface PaginationProps {
  totalCount: number;
  page: number;
  onPageChange: any;
}

export default function Pagination({ totalCount, page, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalCount / 7);
  console.log(`page`, page);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPaginationItems = () => {
    const items = [];

    // Calculate the range of pages to display
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(page + 2, totalPages);

    // Add the first page item
    items.push(<PaginationBootstrap.First key="first" onClick={() => handlePageChange(1)} />);

    // Add the previous page item
    items.push(
      <PaginationBootstrap.Prev key="prev" onClick={() => handlePageChange(page - 1)} disabled={page === 1} />,
    );

    // Add the ellipsis if necessary
    if (startPage > 1) {
      items.push(<PaginationBootstrap.Ellipsis key="ellipsis-start" />);
    }

    // Add the page items
    for (let i = startPage; i <= endPage; i += 1) {
      items.push(
        <PaginationBootstrap.Item key={i} active={i === page} onClick={() => handlePageChange(i)}>
          {i}
        </PaginationBootstrap.Item>,
      );
    }

    // Add the ellipsis if necessary
    if (endPage < totalPages) {
      items.push(<PaginationBootstrap.Ellipsis key="ellipsis-end" />);
    }

    // Add the next page item
    items.push(
      <PaginationBootstrap.Next key="next" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} />,
    );

    // Add the last page item
    items.push(<PaginationBootstrap.Last key="last" onClick={() => handlePageChange(totalPages)} />);

    return items;
  };

  return <PaginationBootstrap className="justify-content-end">{renderPaginationItems()}</PaginationBootstrap>;
}
