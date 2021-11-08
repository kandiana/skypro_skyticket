export const CHECK_TICKET = 'CHECK_TICKET' as const;

export const checkTicket = () => {
  return { type: CHECK_TICKET };
};
