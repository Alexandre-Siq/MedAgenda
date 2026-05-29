export const dashboardStats = [
  { label: 'Consultas hoje', value: '12', hint: '3 em andamento', tone: 'primary' },
  { label: 'Pendentes', value: '5', hint: 'Aguardando confirmacao', tone: 'warning' },
  { label: 'Confirmadas', value: '18', hint: 'Proximos 7 dias', tone: 'success' },
];

export const agendaDoDia = [
  { time: '08:30', patient: 'Mariana Alves', type: 'Consulta inicial', status: 'Confirmada' },
  { time: '10:00', patient: 'Carlos Mendes', type: 'Retorno', status: 'Pendente' },
  { time: '11:30', patient: 'Helena Costa', type: 'Teleconsulta', status: 'Confirmada' },
  { time: '14:00', patient: 'Roberto Lima', type: 'Avaliacao', status: 'Cancelada' },
];

export const weeklySlots = [
  {
    day: 'Segunda',
    slots: [
      { time: '08:00', label: 'Disponivel', status: 'available' },
      { time: '09:00', label: 'Mariana Alves', status: 'busy' },
      { time: '10:00', label: 'Disponivel', status: 'available' },
      { time: '14:00', label: 'Carlos Mendes', status: 'busy' },
    ],
  },
  {
    day: 'Terca',
    slots: [
      { time: '08:00', label: 'Disponivel', status: 'available' },
      { time: '09:30', label: 'Helena Costa', status: 'busy' },
      { time: '11:00', label: 'Disponivel', status: 'available' },
      { time: '15:00', label: 'Disponivel', status: 'available' },
    ],
  },
  {
    day: 'Quarta',
    slots: [
      { time: '08:30', label: 'Disponivel', status: 'available' },
      { time: '10:30', label: 'Roberto Lima', status: 'busy' },
      { time: '13:30', label: 'Disponivel', status: 'available' },
      { time: '16:00', label: 'Disponivel', status: 'available' },
    ],
  },
  {
    day: 'Quinta',
    slots: [
      { time: '09:00', label: 'Disponivel', status: 'available' },
      { time: '10:00', label: 'Ana Beatriz', status: 'busy' },
      { time: '14:30', label: 'Disponivel', status: 'available' },
      { time: '16:30', label: 'Disponivel', status: 'available' },
    ],
  },
  {
    day: 'Sexta',
    slots: [
      { time: '08:00', label: 'Disponivel', status: 'available' },
      { time: '09:00', label: 'Disponivel', status: 'available' },
      { time: '11:00', label: 'Pedro Nunes', status: 'busy' },
      { time: '15:00', label: 'Disponivel', status: 'available' },
    ],
  },
];

export const pacientes = [
  { name: 'Mariana Alves', phone: '(11) 98888-2201', last: '20/05/2026', next: '29/05/2026 09:00' },
  { name: 'Carlos Mendes', phone: '(11) 97777-1902', last: '12/05/2026', next: '29/05/2026 10:00' },
  { name: 'Helena Costa', phone: '(21) 96666-4410', last: '02/05/2026', next: '30/05/2026 11:30' },
  { name: 'Roberto Lima', phone: '(31) 95555-0100', last: '18/04/2026', next: 'Sem agendamento' },
  { name: 'Ana Beatriz', phone: '(41) 94444-6709', last: '25/05/2026', next: '04/06/2026 10:00' },
];

export const chatMessages = [
  { from: 'bot', text: 'Ola! Sou o assistente do MedAgenda. Posso ajudar voce a marcar uma consulta.' },
  { from: 'user', text: 'Quero marcar uma consulta cardiologica.' },
  { from: 'bot', text: 'Claro. Encontrei alguns horarios disponiveis para esta semana.' },
];

export const chatSlots = ['Seg 08:00', 'Ter 11:00', 'Qui 14:30', 'Sex 09:00'];
