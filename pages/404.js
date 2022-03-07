import Head from 'next/head'
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="m-auto">
      <Head>
        <title>Ошибка</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center">

        <h1 className="text-color_B text-6xl sm:text-9xl font-font_B">
          404
        </h1>

        <h2 className="text-color_B text-2xl sm:text-3xl font-font_B">
          Страница не найдена
        </h2>

        <Link href="/">
          <a className='text-color_B hover:text-color_E py-2 font-bold font-font_B underline'>
            Вернуться на главную
          </a>
        </Link>

      </div>

    </div>
  )
}