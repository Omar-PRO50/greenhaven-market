//(100% - padding - cardsNo. * gap - max(padding - 1rem, 3.75rem)) / cardsNo.
//the `max(padding - 1rem, 3.75rem)` is to show a little of the second card
export function getCardWidth(cardsNo: number): string {
  const smScreen = `min-w-[calc((100vw-1rem-(${cardsNo - 3}*1rem)-3.75rem)/${cardsNo - 3})]`;
  const mdScreen = `min-w-[calc((100vw-2rem-(${cardsNo - 2}*1rem)-3.75rem)/${cardsNo - 2})]`;
  const lgScreen = `min-w-[calc((100vw-4rem-(${cardsNo - 1}*1rem)-3.75rem)/${cardsNo - 1})]`;
  const xlScreen = `min-w-[calc((100vw-5rem-(${cardsNo}*1rem)-4rem)/${cardsNo})]`;
  return `${smScreen} md:${mdScreen} lg:${lgScreen} xl:${xlScreen}`;
}
