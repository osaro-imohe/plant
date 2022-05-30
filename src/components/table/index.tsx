/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import cx from 'clsx';
import { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import styles from '../../styles.module.css';
import { TableProps, TableRowProps } from '../../types/components';
import Button from '../button';
import Container from '../container';
import Text from '../text';
import { doesArrayContainValue } from '../../helpers';

function TableRow({
  row, index, selectedRows, toggleRowSelect,
}: TableRowProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const selected = useMemo(() => doesArrayContainValue(selectedRows, index), [index, selectedRows]);
  return (
    <tr
      {...row.getRowProps()}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cx({
        [styles.background_color_gray]: (isHovering && !selected),
        [styles.background_color_purple]: selected,
      })}
    >
      {row.cells.map((cell) => (
        <td
          {...cell.getCellProps()}
          onClick={() => toggleRowSelect(index)}
        >
          {cell.render('Cell')}
        </td>
      ))}
    </tr>
  );
}

function Table({ columns, data }: TableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    canNextPage,
    canPreviousPage,
    previousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable({ columns, data, initialState: { pageSize: 5 } }, usePagination);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleRowSelect = (index: string) => {
    if (doesArrayContainValue(selectedRows, index)) {
      setSelectedRows(selectedRows.filter((value) => value !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };
  return (
    <Container fullWidth inline justifyContent="center">
      <Container>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  row={row}
                  key={i}
                  index={row.id}
                  selectedRows={selectedRows}
                  toggleRowSelect={toggleRowSelect}
                />
              );
            })}
          </tbody>
        </table>
        <Container inline fullWidth justifyContent="flex-end" alignItems="center" paddingTop="20px" paddingBottom="20px">
          <Container inline alignItems="center">
            <Button variant="tertiary" size="xs" text="<" disabled={!canPreviousPage} onClick={() => previousPage()} />
            <Container marginLeft="15px" marginRight="15px">
              <Text light size="xs" text={`${pageIndex + 1} of ${pageOptions.length}`} />
            </Container>
            <Button variant="tertiary" size="xs" text=">" disabled={!canNextPage} onClick={() => nextPage()} />
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default Table;
