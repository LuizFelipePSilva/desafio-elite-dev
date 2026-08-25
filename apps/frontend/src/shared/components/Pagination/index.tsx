import * as S from './styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  const handlePrev = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
  };

  return (
    <S.Container>
      <S.Button $disabled={currentPage === 0} onClick={handlePrev}>
        ‹
      </S.Button>

      {pages.map((page) => (
        <S.Button key={page} $active={page === currentPage} onClick={() => onPageChange(page)}>
          {page + 1}
        </S.Button>
      ))}

      <S.Button $disabled={currentPage === totalPages - 1} onClick={handleNext}>
        ›
      </S.Button>

      <S.Info>
        Página {currentPage + 1} de {totalPages}
      </S.Info>
    </S.Container>
  );
}
