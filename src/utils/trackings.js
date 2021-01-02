import moment from 'moment';

export const formatTime = (data = []) => {
  let result = {};
  let note = '';
  let date;
  for (let i = 0; i < data.length; i++) {
    note = `${moment(data[i].start).format('hh:mm')} => ${moment(data[i].end).format('hh:mm')}`;
    date = data[i].date;
    if (result[date]) {
      result[date][data[i].user] = note;
    } else {
      result = {
        ...result,
        [date]: {
          [data[i].user]: note
        }
      };
    }
  }

  return result;
};
