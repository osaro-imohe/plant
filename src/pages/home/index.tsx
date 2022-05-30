/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Page from '../../components/page';
import Text from '../../components/text';
import Table from '../../components/table';
import { mockData } from '../../utils';
import Container from '../../components/container';
import { TableCell } from '../../types/components';
import Header from '../../components/header';

function Home() {
  const BaseTableColumns = [
    {
      Header: 'Active Model',
      accessor: 'activeModel',
      Cell: ({ value }: TableCell) => <Text size="sm" text={value} />,
    },
    {
      accessor: 'MisclassifiedIcon',
      Cell: () => (
        <Tooltip placement="bottom" title="See misclassified">
          <AssignmentTurnedInIcon />
        </Tooltip>
      ),
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ value }: TableCell) => <Text size="sm" text={`${new Date(value)}`} />,
    },
    {
      Header: 'Parent Model',
      accessor: 'parentModel',
      Cell: ({ value }: TableCell) => <Text size="sm" text={value} />,
    },
    {
      Header: 'Accuracy (sliding)',
      accessor: 'accuracy',
      Cell: ({ value }: TableCell) => <Text variant="tertiary" size="sm" text={value} />,
    },
    {
      Header: '(cumu.)',
      accessor: 'cumu',
      Cell: ({ value }: TableCell) => <Text variant="tertiary" size="sm" text={value} />,
    },
    {
      Header: 'golden-week1',
      accessor: 'goldenWeek',
      Cell: ({ value }: TableCell) => <Text variant="tertiary" size="sm" text={value} />,
    },
    {
      Header: 'Latency (p50, ms)',
      accessor: 'latency',
      Cell: ({ value }: TableCell) => <Text size="sm" text={value} />,
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }: TableCell) => <Text size="xs" bold text={value} variant={value === 'Shadow' ? 'tertiary' : 'auxilary'} />,
    },
    {
      accessor: 'RefreshIcon',
      Cell: () => (
        <Tooltip placement="bottom" title="Refresh model with new data">
          <RefreshIcon />
        </Tooltip>
      ),
    },
  ];
  const columns = useMemo(
    () => BaseTableColumns,
    [BaseTableColumns],
  );
  return (
    <Page>
      <Header />
      <Container marginTop="100px" fullWidth>
        <Table columns={columns} data={mockData} />
      </Container>
    </Page>
  );
}

export default Home;
