import { Dataset } from '@/api';
import { EditIcon } from '@/components/icons';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button } from '@nextui-org/react';
import React from 'react';

interface IProps {
  rows: Dataset[];
  columns: {
    key: string;
    label: string;
  }[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export const CustomTable = ({ rows, columns, page, setPage, totalPages }: IProps) => {
  const renderCell = React.useCallback((item: Dataset, columnKey: any) => {
    switch (columnKey) {
      case 'datasetName':
        return item?.meta_data?.product?.name;
      case 'description':
        return 'N/A';
      case 'time':
        return item?.meta_data?.properties?.datetime;
      case 'isAvailable':
        return 'Available';
      case 'actions':
        return (
          <Button
            isIconOnly
            size='sm'
            variant='light'
            className='text-lg text-default-400 cursor-pointer active:opacity-50'
          >
            <EditIcon />
          </Button>
        );
      default:
        return '';
    }
  }, []);
  return (
    <Table
      color='primary'
      selectionMode='multiple'
      bottomContent={
        <div className='flex w-full justify-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            color='default'
            page={page}
            total={totalPages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        loadingContent='Loading...'
        emptyContent='Loading...'
        // emptyContent='No Data'
        items={rows}
      >
        {(item) => {
          return (
            <TableRow
              className={item.id ? 'ptable-row ptable-row-active' : 'ptable-row ptable-row-inactive'}
              key={item.id}
            >
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};
