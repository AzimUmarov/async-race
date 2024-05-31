import './style.scss';
import PaginationBootstrap from 'react-bootstrap/Pagination';

export default function Pagination() {
  return (
    <PaginationBootstrap className="justify-content-end">
      <PaginationBootstrap.First />
      <PaginationBootstrap.Prev />
      <PaginationBootstrap.Item>{1}</PaginationBootstrap.Item>
      <PaginationBootstrap.Ellipsis />

      <PaginationBootstrap.Item>{10}</PaginationBootstrap.Item>
      <PaginationBootstrap.Item>{11}</PaginationBootstrap.Item>
      <PaginationBootstrap.Item active>{12}</PaginationBootstrap.Item>
      <PaginationBootstrap.Item>{13}</PaginationBootstrap.Item>
      <PaginationBootstrap.Item disabled>{14}</PaginationBootstrap.Item>

      <PaginationBootstrap.Ellipsis />
      <PaginationBootstrap.Item>{20}</PaginationBootstrap.Item>
      <PaginationBootstrap.Next />
      <PaginationBootstrap.Last />
    </PaginationBootstrap>
  );
}
