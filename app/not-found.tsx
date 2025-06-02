import Header from '@/components/Globals/Header/Header'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <>
      <Header />
      <div className='max-w-7xl w-full flex justify-center flex-col items-center mt-26 mx-auto'>
        <h2>404 Not Found :(</h2>
        <Link href="/">Return Home</Link>
      </div>
    </>
  )
}