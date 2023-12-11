import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css"
import Movies from "../component/movies/Movies";

export default function Home() {
  return (
    <main className='green'>
      <Movies />
    </main>
  )
}
