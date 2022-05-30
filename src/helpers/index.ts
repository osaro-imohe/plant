// eslint-disable-next-line import/prefer-default-export
export const doesArrayContainValue = (array: any[], value: any) => array.includes(value);

export const formatChartData = (data: {[key: string]: number|string}) => {
  const date = new Date(data.event_time).setSeconds(0).toString();
  return ({
    index: data.index,
    label: data.label,
    sessionId: data.session_id,
    eventTime: date,
  });
};
