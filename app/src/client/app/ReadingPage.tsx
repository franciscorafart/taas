import { FormEvent, useState } from "react";
import { TAROT_DECK } from "wasp/ext-src/shared/constants";
import { TarotCard } from "wasp/ext-src/shared/types";

export default function ReadingPage() {
    const [cardThrow, setCardThrow] = useState<TarotCard[] | undefined>(undefined);
    const handleThrow = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Tarot reading form submitted');
        const cards = [];
        for(let i = 0; i < 3; i++) {
            cards.push(TAROT_DECK[Math.floor(Math.random() * 78)]);
        }

        setCardThrow(cards);
    }

    return (
        <div className='py-10 lg:mt-10'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-4xl text-center'>
              <h2 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
                <span className='text-yellow-500'>Tarot</span> Reading
              </h2>
            </div>
            <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-white'>
              Write down your question and give some context on it to get the best card reading.
            </p>
            <div className='my-8 border rounded-3xl border-gray-900/10 dark:border-gray-100/10'>
              <div className='space-y-10 my-10 py-8 px-4 mx-auto sm:max-w-lg'>
                <form onSubmit={handleThrow} className='flex flex-col gap-2'>
                  <textarea
                    // type='textarea'
                    name='question'
                    rows={4}
                    // accept='image/jpeg, image/png, .pdf, text/*'
                    className='text-gray-600 '
                  />
                  <button
                    type='submit'
                    className='min-w-[7rem] font-medium text-gray-800/90 bg-yellow-50 shadow-md ring-1 ring-inset ring-slate-200 py-2 px-4 rounded-md hover:bg-yellow-100 duration-200 ease-in-out focus:outline-none focus:shadow-none hover:shadow-none'
                  >
                    Get your reading
                  </button>
                </form>
                <div className='border-b-2 border-gray-200 dark:border-gray-100/10'></div>
                <div className='space-y-4 col-span-full'>
                  <h2 className='text-xl font-bold'>Your Reading</h2>
                  {cardThrow?.length && cardThrow.map((card) => (
                      <div key={card.value} className='flex flex-col gap-2'>
                          <p>{card.label}</p>
                          <img src={`/cards/${card.value}.png`} alt={card.label} />
                      </div>
                  ))}
                  {/* {isFilesLoading && <p>Loading...</p>}
                  {filesError && <p>Error: {filesError.message}</p>}
                  {!!files && files.length > 0 ? (
                    files.map((file: any) => (
                      <div
                        key={file.key}
                        className={cn('flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3', {
                          'opacity-70': file.key === fileToDownload && isDownloadUrlLoading,
                        })}
                      >
                        <p>{file.name}</p>
                        <button
                          onClick={() => setFileToDownload(file.key)}
                          disabled={file.key === fileToDownload && isDownloadUrlLoading}
                          className='min-w-[7rem] text-sm text-gray-800/90 bg-purple-50 shadow-md ring-1 ring-inset ring-slate-200 py-1 px-2 rounded-md hover:bg-purple-100 duration-200 ease-in-out focus:outline-none focus:shadow-none hover:shadow-none disabled:cursor-not-allowed'
                        >
                          {file.key === fileToDownload && isDownloadUrlLoading ? 'Loading...' : 'Download'}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No files uploaded yet :(</p>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}