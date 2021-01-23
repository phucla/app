import moment from 'moment';

export const formatTime = (data = []) => {
  let result = {};
  let note = '';
  let date;
  for (let i = 0; i < data.length; i++) {
    note = `${moment(data[i].start).format('HH:mm')} => ${moment(
      data[i].end
    ).format('HH:mm')}`;
    date = data[i].date;
    if (result[date]) {
      const notes = result[date][data[i].user] || [];
      result[date][data[i].user] = [...notes, note];
    } else {
      result = {
        ...result,
        [date]: {
          [data[i].user]: [note]
        }
      };
    }
  }

  console.log(result);
  return result;
};
