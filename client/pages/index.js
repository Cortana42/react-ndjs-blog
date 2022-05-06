import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <div className='marg'>
          <title>Acceuil</title>
          <h1>Acceuil</h1>
          <h4>Please join us so you can write your own comments !</h4>
        </div>
      </Head>
      <br></br>
      <p>Create your new account</p>
      <Link href="/register" >
        <a>Register</a>
      </Link>
      <p>You already have an account ?</p>
      <Link href="/login" >
        <a>Login</a>
      </Link>
   
    </div>
  )
}
