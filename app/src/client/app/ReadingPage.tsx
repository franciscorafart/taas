import { FormEvent, useState } from "react";
import { TAROT_DECK } from "wasp/ext-src/shared/constants";
import { TarotCard } from "wasp/ext-src/shared/types";
import { generateGptTarotReading } from "wasp/client/operations";
import { CgSpinner } from 'react-icons/cg';


export default function ReadingPage() {
    const [cardThrow, setCardThrow] = useState<TarotCard[] | undefined>(undefined);
    const [reading, setReading] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>('')

    const handleThrow = async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setIsGenerating(true);
        const cards = [];
        for(let i = 0; i < 3; i++) {
            cards.push(TAROT_DECK[Math.floor(Math.random() * 78)]);
        }

        setCardThrow(cards);

        const res = await generateGptTarotReading({ question, cards} );
        console.log('reading res', res)
        setReading(res);
        setIsGenerating(false)
        } catch (err: any) {
          console.error('Error', err.message);
        }
    }

    return (
        <div className='py-10 lg:mt-10'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-4xl text-center'>
              <h2 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
                <span className='text-yellow-500'>Past, Present, Future</span> Reading
              </h2>
            </div>
            <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-white'>
              Write down your question and give some context on it to get the best card reading.
            </p>
            <div className='my-8 border rounded-3xl border-gray-900/10 dark:border-gray-100/10'>
              <div className='space-y-10 my-10 py-8 px-4 mx-auto sm:max-w-lg'>
                <form onSubmit={handleThrow} className='flex flex-col gap-2'>
                  <h3 className="text-md">Your Question</h3>
                  <textarea
                    name='question'
                    placeholder="Your question here (give some context for a better result)"
                    rows={4}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className='text-gray-600 '
                  />
                  <button
                    type='submit'
                    className='min-w-[7rem] font-medium text-gray-800/90 bg-yellow-50 shadow-md ring-1 ring-inset ring-slate-200 py-2 px-4 rounded-md hover:bg-yellow-100 duration-200 ease-in-out focus:outline-none focus:shadow-none hover:shadow-none'
                    disabled={isGenerating}
                  >
                    Get your reading
                  </button>
                </form>
                <div className='border-b-2 border-gray-200 dark:border-gray-100/10'></div>
                <div className='flex gap-6'>
                  {cardThrow?.length && cardThrow.map((card) => (
                    <div key={card.value} className='flex flex-col'>
                          <p>{card.label}</p>
                          <img src={`/marseille/${card.value}.jpg`} alt={card.label} />
                      </div>
                  ))}
                    </div>
                  {isGenerating && <>
                    <CgSpinner className='inline-block mr-2 animate-spin' /> 
                    ...Reading your cards
                  </>}
                  {reading && <>
                    <h2 className='text-xl font-bold'>Your Reading</h2>
                    <div>{reading}</div>
                  </> 
                    }
              </div>
            </div>
          </div>
        </div>
      );
}