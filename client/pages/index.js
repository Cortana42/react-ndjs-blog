import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from '../components/login_form'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Register</title>
        <h1>Register</h1>
      </Head>

    </div>
  )
}
