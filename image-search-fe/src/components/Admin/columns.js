const columns = [
  {
    id: 'id',
    label: 'Request ID',
    align: 'center',
    minWidth: 100,
  //  // format: () => new Intl.DateTimeFormat('uk-UA', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())
  //  format: (date) => (
  //   `${new Date(date).toLocaleString('uk-UA',{day:'numeric', month:'numeric', year:'numeric'})} \\
  //   ${new Date(date).toLocaleString('uk-UA',{hour:'2-digit', minute:'2-digit'})}`
  //  )
  },
  {
    id: 'actual',
    label: 'Насправді',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'expected',
    label: 'Очікувалось',
    minWidth: 170,
    align: 'center',
  },
];

export default columns;
