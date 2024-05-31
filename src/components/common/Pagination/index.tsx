import './style.scss';
import PaginationBootstrap from 'react-bootstrap/Pagination';

interface PaginationProps {
  totalCount: number;
  page: number;
  onPageChange: any;
  limit: number;
}

export default function Pagination({ totalCount, page, onPageChange, limit = 7 }: PaginationProps) {
  const totalPages = Math.ceil(totalCount / limit);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPaginationItems = () => {
    const items = [];

    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(page + 2, totalPages);

    items.push(<PaginationBootstrap.First key="first" onClick={() => handlePageChange(1)} />);

    items.push(
      <PaginationBootstrap.Prev key="prev" onClick={() => handlePageChange(page - 1)} disabled={page === 1} />,
    );

    if (startPage > 1) {
      items.push(<PaginationBootstrap.Ellipsis key="ellipsis-start" />);
    }

    for (let i = startPage; i <= endPage; i += 1) {
      items.push(
        <PaginationBootstrap.Item key={i} active={i === page} onClick={() => handlePageChange(i)}>
          {i}
        </PaginationBootstrap.Item>,
      );
    }

    if (endPage < totalPages) {
      items.push(<PaginationBootstrap.Ellipsis key="ellipsis-end" />);
    }

    items.push(
      <PaginationBootstrap.Next key="next" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} />,
    );

    items.push(<PaginationBootstrap.Last key="last" onClick={() => handlePageChange(totalPages)} />);

    return items;
  };

  return (
    <div>
      <div>Total Cars: {totalCount}</div>
      <PaginationBootstrap className="justify-content-end">{renderPaginationItems()}</PaginationBootstrap>
    </div>
  );
}
